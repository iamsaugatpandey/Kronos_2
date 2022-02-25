h = (document.querySelector('.POK_timemap').clientHeight) / 2 + (document.querySelector('.POK_timemap').clientHeight) / 1.8;
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

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}


d3.json('data/all_data.json').then(function (data) {

    const allTime = new Set(data.map(function (d) {
        return d.Time
    }))
    const allName = new Set(data.map(function (d) {
        return d.Name
    }))

    d3.select('.selectTime1')
        .selectAll('myOptions')
        .data(allTime).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })

    d3.select('.selectTime2')
        .selectAll('myOptions')
        .data(allTime).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })


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
            .html(d.Time + "<br/>" + d.Name + '<br/>' + d.Date)
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

    // const circles = svg
    //     .selectAll("circle")
    //     .data(data.filter(function (d) {
    //         return d.Name == 'Lucas Alcazar' && d.Date == '2014-01-06'
    //     }))
    //     .enter()
    //     .append("circle")
    //     .attr("r", 6)
    //     .style("stroke", "black")
    //     .style("stroke-width", 2)
    //     .attr("cy", function (d) {
    //         return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
    //     })
    //     .attr("cx", function (d) {
    //         return (((d.Long - min_long) / (max_long - min_long)) * w);
    //     })
    //     .style("fill", function (d) {
    //         return myColor('valueA')
    //     })
    //     .on("mouseover", mouseover)
    //     .on("mousemove", mousemove)
    //     .on("mouseleave", mouseleave);

    // circles.exit().remove();

    //function to update the group
    function update(typeData) {
        var dots = svg
            .selectAll('circle')
            .data(typeData)
            .enter()
            .append('circle')
            .attr('r', 5)
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .attr("cy", function (d) {
                return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
            })
            .attr("cx", function (d) {
                return (((d.Long - min_long) / (max_long - min_long)) * w);
            })
            .style('fill', function (d) {
                return myColor(allName)
            })

        dots.transition()
            .duration(1000)
            .style('opacity', 1);

        dots.on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

        dots.exit().remove();
    }
    d3.select('.selectTime1').on('change', function (event, d) {
        const selectedGroup = d3.select(this).property('value')
        const indexCalc = data.map(d => d.Time).indexOf(selectedGroup)
        console.log(indexCalc)
        d3.select('.selectTime2').on('change', function (event, d) {
            const selectedTime = d3.select(this).property('value')
            const indexCalc2 = data.map(d => d.Time).indexOf(selectedTime)
            console.log(indexCalc2)
            //const new_Data = data.slice(indexCalc, indexCalc2 + 1)
            //update(new_Data, allName)
            const grouping = data.groupBy(function (d) {
                return d.Time == selectedGroup
            })
            //console.log((grouping.true)[0])
            const indexCalc3 = data.indexOf((grouping.true)[0])
            //console.log(indexCalc3)
            const grouping2 = data.groupBy(function (d) {
                return d.Time == selectedTime
            })
            const trueGroup = grouping2.true
            const indexCalc4 = data.indexOf(trueGroup[trueGroup.length - 1])
            const new_Data = data.slice(indexCalc3, indexCalc4)
            //console.log(typeof (data))
            console.log(data)
            console.log(new_Data)
            update(new_Data)
            console.log(test)
        })
    })
})