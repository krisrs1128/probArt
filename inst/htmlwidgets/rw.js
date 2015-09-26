HTMLWidgets.widget({

    name: 'rw',

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

	var rw_move = function(data, n_y) {
	    var decay_rate = 0.999
	    var cur_ix = 1;
	    for(var i = 0; i < data.length; i++) {
		if(data[i].col == 1) {
		    cur_ix = i;
		}
		data[i].col *= decay_rate;
	    }
	    var sign = Math.random() > 0.5 ? -1 : 1;
	    var step = Math.random() > 0.5 ? n_y : 1;
	    var next_ix = (cur_ix + sign * step) % (data.length);
	    if(next_ix < 0) {
		next_ix += data.length;
	    }
	    data[next_ix].col = 1;
	    return (data);
	}

	var draw = function(data) {
	    svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function(d) { return x_scale(d.x) })
    		.attr("y", function(d) { return y_scale(d.y) } )
		.attr("width", x_scale(1))
		.attr("height", y_scale(1))
		.attr("fill", col_fun)
	}

	var update = function(data) {
	    svg.selectAll("rect")
		.attr("fill", col_fun)
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
	    data = rw_move(data, x.ny);
	    update(data);
	}, x.t)
    },

    resize: function(el, width, height, instance) {
    }

});
