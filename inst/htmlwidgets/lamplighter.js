HTMLWidgets.widget({

    name: 'lamplighter',

    type: 'output',

    initialize: function(el, width, height) {
	return {
	    width: width,
	    height: height
	}
  },

    renderValue: function(el, x, instance) {
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
		.attr("x", function(d) { return x_scale(d.x) })
    		.attr("y", function(d) { return y_scale(d.y) } )
		.attr("width", x_scale(1))
		.attr("height", y_scale(1))
		.attr("fill", function(d) { return col_fun(d.col) });
	}

	var update = function(data) {
	    svg.selectAll("rect")
		.attr("fill", function(d) { return col_fun(d.col) } )
	}

	var lamplighter_move = function(data, n_y) {
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
	    var step = Math.random() > 0.5 ? n_y : 1;
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
	var svg = d3.select(el)
	    .append("svg")
	    .style("width", instance.width)
	    .style("height", instance.height);

	var x_scale = d3.scale.linear()
	    .domain([0, x.nx])
	    .range([0, instance.width]);
	var y_scale = d3.scale.linear()
	    .domain([0, x.ny])
	    .range([0, instance.height]);

	data = initialize_data(x.nx, x.ny);
	draw(data);
	setInterval(function() {
	    data = lamplighter_move(data, x.ny)
	    update(data);
	}, x.t)
    },

    resize: function(el, width, height, instance) {
    }

});
