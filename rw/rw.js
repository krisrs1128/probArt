
////////////////////////////////////////////////////////////////////////////////
// Utility functions
////////////////////////////////////////////////////////////////////////////////

// initialize empty data, with color in top right
initialize_data = function(n_x, n_y) {
    var data = [];
    for(var i = 0; i < n_x; i++) {
	for(var j = 0; j < n_y; j++) {
	    data.push({x: i, y: j, col: 0});
	}
    }
    init_ix = (n_x * n_y) / 2 + n_y / 2
    data[init_ix].col = 1;
    return (data);
}

var col_scale = d3.scale.linear()
    .domain([0, 1])
    .range(["black", "plum"]);

var col_fun = function(d) {
    if(d.col == 1) {
	return ("steelblue")
    } else {
	return col_scale(d.col);
    }
}

var draw = function(data) {
    svg.selectAll("rect")
	.data(data)
	.enter()
	.append("rect")
	.attr("x", function(d) { return x(d.x) })
    	.attr("y", function(d) { return y(d.y) } )
	.attr("width", x(1))
	.attr("height", y(1))
	.attr("fill", col_fun)
}

var update = function(data) {
    svg.selectAll("rect")
	.attr("fill", col_fun)
}

var rw_move = function(data) {
    var decay_rate = 0.999
    var cur_ix = 1;
    for(var i = 0; i < data.length; i++) {
	if(data[i].col == 1) {
	    cur_ix = i;
	}
	data[i].col *= decay_rate;
    }
    var sign = Math.random() > 0.5 ? -1 : 1;
    var step = Math.random() > 0.5 ? n_x : 1;
    var next_ix = (cur_ix + sign * step) % (data.length);
    if(next_ix < 0) {
	next_ix += data.length;
    }
    data[next_ix].col = 1;
    return (data);
}

////////////////////////////////////////////////////////////////////////////////
// Actual drawing
////////////////////////////////////////////////////////////////////////////////
var width = 100;
var height = 100;
var pad = 0;
var left_pad = 0;
var svg = d3.select("#rw")
    .append("svg")
    .style("width", width)
    .style("height", height);

var n_x = 20;
var n_y = 20;
var x = d3.scale.linear()
    .domain([0, n_x])
    .range([pad, width - pad]);
var y = d3.scale.linear()
    .domain([0, n_y])
    .range([pad, height - pad]);

data = initialize_data(n_x, n_y);
draw(data);
setInterval(function() {
    data = rw_move(data)
    update(data);
}, 100)
