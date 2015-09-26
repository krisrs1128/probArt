
////////////////////////////////////////////////////////////////////////////////
// Utility functions
////////////////////////////////////////////////////////////////////////////////

// initialize empty data, with color in center
initialize_data = function(n_x, n_y) {
    var data = [];
    for(var i = 0; i < n_x; i++) {
	for(var j = 0; j < n_y; j++) {
	    data.push({x: i, y: j, col: -1});
	}
    }
    init_ix = (n_x * n_y) / 2 + n_y / 2
    data[init_ix].col = 2;
    return (data);
}

var col_fun = d3.scale.ordinal()
    .domain([-2, -1, 1, 2])
    .range(["steelblue", "black", "plum", "steelblue"])

var draw = function(data) {
    svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d) { return x(d.x) })
    	.attr("y", function(d) { return y(d.y) } )
	.attr("width", x(1))
	.attr("height", y(1))
	.attr("fill", function(d) { return col_fun(d.col) });
}

var update = function(data) {
    svg.selectAll("rect")
	.attr("fill", function(d) { return col_fun(d.col) } )
}

var lamplighter_move = function(data) {
    var cur_ix = 1;

    // change color for point the lamplighter is leaving
    for(var i = 0; i < data.length; i++) {
	if(data[i].col == 2 || data[i].col == -2) {
	    cur_ix = i;
	    data[cur_ix].col /= 2;
	}
    }

    // randomness in next step, and whether flips light
    var sign = Math.random() > 0.5 ? -1 : 1;
    var step = Math.random() > 0.5 ? n_x : 1;
    var flip_lamp = Math.random() > 0.5;

    // choose next step
    var next_ix = (cur_ix + sign * step) % (data.length);
    if(next_ix < 0) {
	next_ix += data.length;
    }

    // choose to flip light
    if(flip_lamp) {
	data[next_ix].col *= -1;
    }
    data[next_ix].col *= 2;
    return (data);
}

////////////////////////////////////////////////////////////////////////////////
// Actual drawing
////////////////////////////////////////////////////////////////////////////////
var width = 200;
var height = 200;
var pad = 0;
var left_pad = 0;
var svg = d3.select("#lamplighter")
    .append("svg")
    .style("width", width)
    .style("height", height);

var n_x = 50;
var n_y = 50;
var x = d3.scale.linear()
    .domain([0, n_x])
    .range([pad, width - pad]);
var y = d3.scale.linear()
    .domain([0, n_y])
    .range([pad, height - pad]);

data = initialize_data(n_x, n_y);
draw(data);
setInterval(function() {
    data = lamplighter_move(data)
    update(data);
}, 100)
