var createElement = require('virtual-dom/create-element');
var gantt = require('../../');
var g = gantt(require('./chart.json'));

var elem = document.querySelector('#chart');
elem.appendChild(createElement(g.tree()));
