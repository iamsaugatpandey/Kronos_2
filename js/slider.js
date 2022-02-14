let width = (0.65) * window.innerWidth, height = (0.38) * window.innerHeight;

// Date
var dataTime = d3.range(0, 15).map(function(d) {
    return new Date(2014, 1, 6 + d);
});
var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24)
    .width(300)
    .tickFormat(d3.timeFormat('%M%D'))
    .tickValues(dataTime)
    .default(new Date(2014, 1, 13))
    .on('onchange', val => {
        d3.select('p#value-date').text(d3.timeFormat('%M%D')(val));
    });

var gTime = d3
    .select('div#sliders-date')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gTime.call(sliderTime);

d3.select('p#value-date').text(d3.timeFormat('%M%D')(sliderTime.value()));

// Time
var dTime = d3.range(0, 25).map(function(t) {
    return new Date(2014, 1, 6)+t*60*60*1000;
});
var slidTime = d3
    .sliderBottom()
    .min(d3.min(dTime))
    .max(d3.max(dTime))
    .step(1000 * 60 * 60)
    .width(300)
    .tickFormat(d3.timeFormat('%HH%MM'))
    .tickValues(dTime)
    .default(new Date(2014, 1, 13))
    .on('onchange', val => {
        d3.select('p#value-time').text(d3.timeFormat('%HH:%MM')(val));
    });

var gT = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

gT.call(slidTime);

d3.select('p#value-time').text(d3.timeFormat('%HH:%MM')(slidTime.value()));
