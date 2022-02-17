h = document.querySelector('.POK_timemap').clientHeight;
w = 1.79 * h;
min_long = 24.82386787;
max_long = 24.91035698;
min_lat = 36.04482337;
max_lat = 36.09568917;

const svg = d3.select(".POK_timemap")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .append('g')
// const vis = frame
//     .append("g");


d3.json('../data/all_data.json').then(function (data) {
    //console.log(data.Name)
    // for (var i = 0; i < data.length; i++) {
    //     console.log(data[i].Name);
    // }
    const allName = new Set(data.map(d => d.Name))
    const allDate = new Set(data.map(d => d.Date))
    console.log(allName)
    d3.select('.selectButton')
        .selectAll('myOptions')
        .data(allName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })


    d3.select('.selectDate')
        .selectAll('myOptions')
        .data(allDate).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })

    //Color Scale for different names
    const myColor = d3.scaleOrdinal().domain(allName).range(d3.schemeSet2)

    const circles = svg
        .selectAll("circle")
        .data(data.filter(function (d) {
            return d.Name == 'Lucas Alcazar' && d.Date == '2014-01-06'
        }))
        .enter()
        .append("circle")
        .attr("r", 4)
        .style("stroke", "black")
        .style("stroke-width", 1)
        .attr("cy", function (d) {
            return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
        })
        .attr("cx", function (d) {
            return (((d.Long - min_long) / (max_long - min_long)) * w);
        })
        .style("fill", function (d) {
            return myColor('valueA')
        });

    //function to update the group
    function update(selectOption, selectOption2) {
        const filter_data = data.filter(function (d) {
            return d.Name == selectOption && d.Date == selectOption2
        })
        circles.data(filter_data).transition().duration(800)
            .attr("cy", function (d) {
                return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
            })
            .attr("cx", function (d) {
                return (((d.Long - min_long) / (max_long - min_long)) * w);
            })
            .style('fill', function (d) {
                return myColor(selectOption)
            });
    }
    d3.select('.selectButton').on('change', function (event, d) {
        const selectedGroup = d3.select(this).property('value')
        // update(selectedGroup);
        d3.select('.selectDate').on('change', function (event, d) {
            const selectedDate = d3.select(this).property('value')
            update(selectedGroup, selectedDate)
        })
    })
})