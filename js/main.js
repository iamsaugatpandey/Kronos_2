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
    const allName = new Set(data.map(function (d) {
        return d.Name
    }))
    const allDate = new Set(data.map(function (d) {
        return d.Date
    }))
    console.log(allDate)

    d3.select('.selectButton')
        .selectAll('myOptions')
        .data(allName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })


    d3.select('.selectDate')
        .selectAll('myOptions')
        .data(allDate).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })

    //creating a tooltip
    var tooltip = d3.select('.POK_timemap')
        .append('div')
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px")

    const mouseover = function (event, d) {
        tooltip
            .style("opacity", 1)
    }

    const mousemove = function (event, d) {
        tooltip
            .html(`Time: ${d.Time}`)
            .style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", (event.y) / 2 + "px")
    }

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    const mouseleave = function (event, d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }


    //Color Scale for different names
    const myColor = d3.scaleOrdinal().domain(allName).range(d3.schemeSet2)

    const circles = svg
        .selectAll("circle")
        .data(data.filter(function (d) {
            return d.Name == 'Lucas Alcazar' && d.Date == '2014-01-06'
        }))
        .enter()
        .append("circle")
        .attr("r", 6)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .attr("cy", function (d) {
            return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
        })
        .attr("cx", function (d) {
            return (((d.Long - min_long) / (max_long - min_long)) * w);
        })
        .style("fill", function (d) {
            return myColor('valueA')
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

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
            })
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
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