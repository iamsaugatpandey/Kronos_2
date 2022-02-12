let width = 800, height = 700;

var projection = d3.geo.mercator()
    .scale(1500)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

// Set svg width & height
var svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);


var g = svg.append('g');

var mapLayer = g.append('g')
    .classed('map-layer', true);

d3.json('/data/Abila.geojson', function (error, mapData) {
    var features = mapData.features;
    projection.fitSize([width,height],mapData);
    
    // Update color scale domain based on data

    // Draw each province as a path
    mapLayer.selectAll('path')
        .data(features)
        .enter().append('path')
        .attr('d', path)
        .style("fill", "steelblue");


    d3.selectAll('path').attr('fill', 'red')
});
