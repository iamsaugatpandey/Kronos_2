
var dateTime = d3.range(0, 15).map(function (d) {
    return new Date(2014, 1, 6 + d);
})
var slideTime = d3
    .sliderBottom()
    .min(d3.min(dateTime))
    .max(d3.max(dateTime))
    .step(1000 * 60 * 60 * 24)
    .width((document.querySelector('.sliders').clientWidth) - (document.querySelector('.sliders').clientWidth) / 2)
    .tickFormat(d3.timeFormat('%m/%d'))
    .tickValues(dateTime)
    .default(new Date(2014, 1, 13))
    .on('onchange', val => {
        d3.select('#value-date').text(d3.timeFormat('%m/%d')(val));
    });

var gTime = d3.select('.slide-date').append('svg')
    .attr('width', (document.querySelector('.sliders').clientWidth))
    .attr('height', (document.querySelector('.sliders').clientHeight) / 3).append('g').attr('transform', 'translate(30,30)');
gTime.call(slideTime);
d3.select('#value-date').text(d3.timeFormat('%m/%d')(slideTime.value()))

var dTime = d3.range(0, 25).map(function (t) {
    return new Date(2014, 1, 6) + t * 60 * 60 * 1000;
})

var slideTime = d3
    .sliderBottom()
    .min(d3.min(dTime))
    .max(d3.max(dTime))
    .step(1000 * 60 * 60)
    .width((document.querySelector('.sliders').clientWidth) - (document.querySelector('.sliders').clientWidth) / 2)
    .tickFormat(d3.timeFormat('%h:%M'))
    .tickValues(dTime)
    .default(new Date(2014, 1, 13))
    .on('onchange', val => {
        d3.select('#value-time').text(d3.timeFormat('%h:%M')(val));
    });

var gTime = d3.select('.slide-time').append('svg')
    .attr('width', (document.querySelector('.sliders').clientWidth))
    .attr('height', (document.querySelector('.sliders').clientHeight) / 3).append('g').attr('transform', 'translate(30,30)');
gTime.call(slideTime);
d3.select('#value-time').text(d3.timeFormat('%h:%M')(slideTime.value()))

// // Date
// var dataTime = d3.range(0, 15).map(function (d) {
//     return new Date(2014, 1, 6 + d);
// });
// var sliderTime = d3
//     .sliderBottom()
//     .min(d3.min(dataTime))
//     .max(d3.max(dataTime))
//     .step(1000 * 60 * 60 * 24)
//     .width(300)
//     .tickFormat(d3.timeFormat('%M%D'))
//     .tickValues(dataTime)
//     .default(new Date(2014, 1, 13))
//     .on('onchange', val => {
//         d3.select('#value-date').text(d3.timeFormat('%M%D')(val));
//     });

// var gTime = d3
//     .select('#sliders-date')
//     .append('svg')
//     .attr('width', 500)
//     .attr('height', 100)
//     .append('g')
//     .attr('transform', 'translate(30,30)');

// gTime.call(sliderTime);

// d3.select('#value-date').text(d3.timeFormat('%M%D')(sliderTime.value()));

// // Time
// var dTime = d3.range(0, 25).map(function (t) {
//     return new Date(2014, 1, 6) + t * 60 * 60 * 1000;
// });
// var slidTime = d3
//     .sliderBottom()
//     .min(d3.min(dTime))
//     .max(d3.max(dTime))
//     .step(1000 * 60 * 60)
//     .width(300)
//     .tickFormat(d3.timeFormat('%HH%MM'))
//     .tickValues(dTime)
//     .default(new Date(2014, 1, 13))
//     .on('onchange', val => {
//         d3.select('#value-time').text(d3.timeFormat('%HH:%MM')(val));
//     });

// var gT = d3
//     .select('#slider-time')
//     .append('svg')
//     .attr('width', 500)
//     .attr('height', 100)
//     .append('g')
//     .attr('transform', 'translate(30,30)');

// gT.call(slidTime);

// d3.select('#value-time').text(d3.timeFormat('%HH:%MM')(slidTime.value()));
