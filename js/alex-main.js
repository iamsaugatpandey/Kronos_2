w = 1000;
h = 560;
min_long = 24.82386787;
max_long =  24.91035698;
min_lat = 36.04482337;
max_lat = 36.09568917;

const frame = d3.select("#POK_timemap")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
const vis = frame
     .append("g");

let year = 1997;


d3.json("../data/all_data.json").then(function (data) {

    // d3.select("#year_number").on("input", function () {
    //     year = this.value;
    //     d3.selectAll('circle')
    //         .attr("visibility", function (d) {
    //             if (d.startYear <= year)
    //                 return "visible"
    //             else
    //                 return "hidden"
    //         });
    //     info.text(this.value + "- " + data.info[year])
    // });

    // the circles
    const circles = vis
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .style("fill",  "#9b5de8")
        .style("stroke", "black")
        .style("stroke-width", 1)
        // .attr("visibility", function (d) {
        //     if (d.startYear <= year)
        //         return "visible"
        //     else
        //         return "hidden"
        // });
        .attr("cy", function(d) {
            return (((max_lat - d.Lat)/(max_lat - min_lat)) * h);
        })
        .attr("cx", function(d) {
            return (((d.Long - min_long)/(max_long - min_long)) * w);
        })

})



