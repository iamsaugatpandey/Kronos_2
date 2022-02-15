let width = document.querySelector('.map-content').clientWidth;
let height = document.querySelector('.map-content').clientHeight;
let imgWidth = width, imgHeight = height

var projection = d3.geoMercator()
    .scale(1000)
    .translate([width, height]);

var path = d3.geoPath()
    .projection(projection);

// Set svg width & height
var svg = d3.select('.map-content').append('svg')
    .attr('width', width)
    .attr('height', height);

d3.json('/data/Abila_Map.geojson').then(function (mapData) {


    // Update color scale domain based on data
    projection.fitSize([width, height], mapData)
    path.projection(projection)

    // Draw each province as a path
    svg.selectAll('path')
        .data(mapData.features)
        .enter().append('path')
        .attr('d', path)
        .attr('fill', 'none')
        .attr('stroke', 'gray')
});

svg.append('image').attr('height', imgHeight).attr('width', imgWidth).attr('xlink:href', '/data/MC2-tourist.jpg')
