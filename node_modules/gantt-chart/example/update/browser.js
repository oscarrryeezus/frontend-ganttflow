var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var gantt = require('../../');

var elem = document.querySelector('#chart svg');
var txt = document.querySelector('textarea');

var prev = null;

txt.addEventListener('keyup', function () {
    try { var chart = JSON.parse(txt.value) }
    catch (err) {
        txt.style.backgroundColor = '#ffc0c0c0';
        return;
    }
    txt.style.backgroundColor = 'white';
    
    var tree = gantt(chart).tree();
    if (prev) {
        patch(elem, diff(prev, tree));
    }
    else {
        elem.appendChild(createElement(tree));
    }
    prev = tree;
});
