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

let day = "6";

const getCompareString = function(num) {
    if (num < 10)
        return '2014-01-0' + num;
    else
        return '2014-01-' + num;
}
// TODO: make function that takes a number (6) and turns it into a string to compare Dates to (2014-01-06)


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
    d3.selectAll("input[name='day']").on("change", function(){
        day = this.value;
        d3.selectAll('circle')
                .attr("visibility", function (d) {
                    if (d.Date === getCompareString(day))
                        return "visible"
                    else
                        return "hidden"
                });
    });

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
        .attr("visibility", function (d) {
            if (d.Date === getCompareString(6))
                return "visible"
            else
                return "hidden"
        })
        .attr("cy", function(d) {
            return (((max_lat - d.Lat)/(max_lat - min_lat)) * h);
        })
        .attr("cx", function(d) {
            return (((d.Long - min_long)/(max_long - min_long)) * w);
        });

})



