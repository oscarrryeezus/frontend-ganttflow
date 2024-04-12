# gantt-chart

generate an svg gantt chart in node and the browser

# example

[View this example on htmlbin](https://bffb58cbadd8ffccf22421f883769b1b8b3b31e5.htmlb.in).

export some task data in `chart.json`:

``` js
{
    "wow": {
        "dependencies": [ "amaze" ],
        "duration": "1 week"
    },
    "amaze": {
        "duration": "3 days"
    },
    "cool": {
        "duration": "6 days"
    },
    "whatever": {
        "duration": "1 day",
        "dependencies": [ "wow" ]
    },
    "very": {
        "duration": "2 days",
        "dependencies": [ "amaze" ]
    },
    "great": {
        "duration": "8 days",
        "dependencies": [ "very" ]
    }
}
```

then you can render the chart to a string for the server:

``` js
var str = require('virtual-dom-stringify');
var gantt = require('gantt-chart');
var g = gantt(require('./chart.json'));
console.log(str(g.tree()));
```

or to the dom in the browser:

``` js
var createElement = require('virtual-dom/create-element');
var gantt = require('gantt-chart');
var g = gantt(require('./chart.json'));

var elem = document.querySelector('#chart');
elem.appendChild(createElement(g.tree()));
```

# methods

``` js
var gantt = require('gantt-chart')
```

## var g = gantt(tasks={})

Create a gantt chart instance `g` from some `tasks`.

The `tasks` object should map task names to `t` objects with these properties:

* `t.duration` - a
[human-readable duration](https://npmjs.org/package/parseparse-duration) string
* `t.dependencies` - an array of string names that the current task depends on

## g.add(name, t)

Add a task `t` as `name`.

If a task called `name` already exists, the existing task will be overwritten.

## g.remove(name)

Remove a task by its `name`.

## var tree = g.tree(opts)

Return a [virtual-dom](https://npmjs.org/package/virtual-dom) `tree`.

Optionally set attributes on the svg primitives with:

* `opts.rect`
* `opts.text` 
* `opts.arrow`

## var sorted = g.sort()

Return a topologically sorted list of 

## var coords = g.coords(sorted)

Return an object mapping names to arrays of `[x0,y0,x1,y1]` coordinates.

# install

With [npm](https://npmjs.org) do:

```
npm install gantt-chart
```

to get the library or

```
npm install -g gantt-chart
```

to get the `gantt-chart` command.

# license

MIT
