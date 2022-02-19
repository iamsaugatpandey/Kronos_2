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

    d3.select('.selectButton')
        .selectAll('myOptions')
        .data(allName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })


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
            .html(`Time: ${d.Name}`)
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

    d3.selectAll('circles').remove();
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


    function updateDate(setName) {
        d3.select('.selectDate')
            .selectAll('myOptions')
            .data(setName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })
    }
    function updateTime1(setName) {
        d3.select('.selectTime1')
            .selectAll('myOptions')
            .data(setName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })
    }
    function updateTime2(setName) {
        d3.select('.selectTime2')
            .selectAll('myOptions')
            .data(setName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })
    }

    //function to update the group
    function update(typeData, selectOption) {
        var dots = circles.data(typeData)
            .attr("cy", function (d) {
                return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
            })
            .attr("cx", function (d) {
                return (((d.Long - min_long) / (max_long - min_long)) * w);
            })
            .style('fill', function (d) {
                return myColor(selectOption)
            })

        dots.transition()
            .duration(1000)
            .delay(function (d, i) { return i * (1000 / 4); })
            .style('opacity', 1);

        dots.on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
    }
    d3.select('.selectButton').on('change', function (event, d) {
        const selectedGroup = d3.select(this).property('value')
        // update(selectedGroup);
        const filtering = data.filter(function (d) {
            return d.Name == selectedGroup
        })
        const allDate = new Set(filtering.map(function (d) {
            return d.Date
        }))
        updateDate(allDate);

        d3.select('.selectDate').on('change', function (event, d) {
            const selectedDate = d3.select(this).property('value')
            const filter_2 = data.filter(function (d) {
                return d.Name == selectedGroup && d.Date == selectedDate
            })
            const allTime = new Set(filter_2.map(function (d) {
                return d.Time
            }))
            updateTime1(allTime);
            updateTime2(allTime);
            //update(selectedGroup, selectedDate)
            d3.select('.selectTime1').on('change', function (event, d) {
                const selectedTime1 = d3.select(this).property('value')
                const indexCalc = filter_2.map(d => d.Time).indexOf(selectedTime1)
                console.log("The first index is", indexCalc)

                d3.select('.selectTime2').on('change', function (event, d) {
                    const selectedTime2 = d3.select(this).property('value')
                    const indexCalc2 = filter_2.map(d => d.Time).indexOf(selectedTime2)
                    console.log("The second index is", indexCalc2)
                    const new_Data = filter_2.slice(indexCalc, indexCalc2 + 1)
                    console.log(new_Data)
                    update(new_Data, selectedGroup)
                    //getRangeTime(selectedGroup, selectedDate, selectedTime1, selectedTime2)
                    //console.log(getRangeTime(selectedGroup, selectedDate, selectedTime1, selectedTime2))
                })
            })
        })
    })
})