var h = require('virtual-hyperscript-svg');
var defined = require('defined');
var concat = require('concat-map');
var toposort = require('toposort');
var parsedur = require('parse-duration');
var copy = require('shallow-copy');
var xtend = require('xtend');

module.exports = Gantt;

function Gantt (tasks) {
    if (!(this instanceof Gantt)) return new Gantt(tasks);
    var self = this;
    
    this.tasks = {};
    this.unnamed = 0;
    this.mspx = parsedur('1 month') / 1000;
    Object.keys(tasks || {}).forEach(function (key) {
        self.add(key, copy(tasks[key]));
    });
}

Gantt.prototype.add = function (name, t) {
    t.name = name;
    this.tasks[name] = t;
};

Gantt.prototype.remove = function (name) {
    delete this.tasks[name];
};

Gantt.prototype.sort = function () {
    var self = this;
    return toposort(concat(Object.keys(self.tasks), function (key) {
        var t = self.tasks[key];
        if (!t.dependencies || t.dependencies.length === 0) {
            return [ [ key, '__END__' ] ];
        }
        return t.dependencies.map(function (d) { return [ key, d ] });
    })).reverse().slice(1).map(tof);
    function tof (key) { return self.tasks[key] }
};

Gantt.prototype.deptime = function (t, time) {
    if (!t) return 0;
    var deps = t.dependencies || [];
    var max = time;
    for (var i = 0; i < deps.length; i++) {
        var dt = this.deptime(this.tasks[deps[i]], time);
        if (dt > max) max = dt;
    }
    return max + parsedur(t.duration || '');
};

Gantt.prototype.coords = function (sorted) {
    var self = this;
    var coords = {};
    sorted.forEach(function (t, ix) {
        if (!t) return;
        var time = self.deptime(t, 0);
        var ms = parsedur(t.duration);
        
        var x1 = time / self.mspx;
        var x0 = x1 - ms / self.mspx + 5;
        var y0 = (50 + 5) * ix;
        var y1 = y0 + 50;
        coords[t.name] = [ x0, y0, x1, y1 ];
    });
    return coords;
};

Gantt.prototype.tree = function (opts) {
    var self = this;
    if (!opts) opts = {};
    
    var sorted = self.sort();
    var coords = self.coords(sorted);
    
    var groups = sorted.reverse().map(function (t, rix) {
        if (!t) return '';
        var ix = sorted.length - rix - 1;
        var c = coords[t.name];
        
        var time = self.deptime(t, 0);
        var ms = parsedur(t.duration);
        
        var x0 = 0, x1 = c[2] - c[0];
        var y0 = 0, y1 = c[3] - c[1];
        
        var pminy = c[1];
        (t.dependencies || []).forEach(function (k) {
            if (!coords[k]) return;
            if (coords[k][3] < pminy) pminy = coords[k][3];
        });
        
        var arrowline = [
            [ x0 - 25, pminy - c[1] - 5 ],
            [ x0 - 25, y0 + 25 ],
            [ x0 - 15, y0 + 25 ]
        ];
        var arrowhead = [
            [ x0 - 15, + 20 ],
            [ x0 - 15, y0 + 30 ],
            [ x0 - 5, y0 + 25 ]
        ];
        
        var children = [];
        children.push(h('rect', xtend(opts.rect, {
            fill: '#ddd',
            x: x0, y: y0,
            width: x1 - x0,
            height: y1 - y0
        })));
        children.push(h('text', xtend(opts.text, {
            x: 5, y: (y1 - y0 + 20 / 2) / 2,
            fontSize: 20,
            fill: 'purple'
        }), t.name));
        
        if (t.dependencies && t.dependencies.length) {
            children.push(h('polyline', xtend(opts.arrow, {
                stroke: 'purple',
                strokeWidth: 3,
                fill: 'transparent',
                points: arrowline.join(' ')
            })));
            children.push(h('polygon', xtend(opts.arrow, {
                fill: 'purple',
                points: arrowhead.join(' ')
            })));
        }
        return h('g', {
            transform: 'translate(' + c[0] + ',' + c[1] + ')'
        }, children);
    });
    
    return h('svg', { width: '100%', height: '100%' }, groups);
};
