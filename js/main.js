let width = 800, height = 700;

var projection = d3.geo.mercator()
    .scale(1500)
    // Center the Map in Colombia
    .center([-74, 4.5])
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

// Set svg width & height
var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);


var g = svg.append('g');

var effectLayer = g.append('g')
    .classed('effect-layer', true);

var mapLayer = g.append('g')
    .classed('map-layer', true);

var dummyText = g.append('text')
    .classed('dummy-text', true)
    .attr('x', 10)
    .attr('y', 30)
    .style('opacity', 0);

var bigText = g.append('text')
    .classed('big-text', true)
    .attr('x', 20)
    .attr('y', 45);
d3.json('/data/Abila.geojson', function (error, mapData) {
    var features = mapData.features;

    // Update color scale domain based on data

    // Draw each province as a path
    mapLayer.selectAll('path')
        .data(features)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style("fill", "steelblue");


    d3.selectAll('path').attr('fill', 'red')
});
