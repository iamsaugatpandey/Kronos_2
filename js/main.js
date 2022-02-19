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

//map is unique values
d3.json('../data/all_data.json').then(function (data) {
    const allName = new Set(data.map(function (d) {
        return d.Name
    }))
    const allDate = new Set(data.map(function (d) {
        return d.Date
    }))
    const allTime = data.map(function (d) {
        return d.Time
    })
    //console.log(allTime[0])
    //console.log(allTime)
//data structure, object


var Timehour=[];
var Timeminute=[];
for (i=0; i < allTime.length; i++) {
    //Do something
    var datatime=allTime[i];
    //var string = JSON.stringify(datatime)
    var myArray = datatime.split(":");
    let hour = parseInt(myArray[0]);
    let minute = parseInt(myArray[1]);
    Timehour.push(hour)
    Timeminute.push(minute)
    }
let uniquechar = [...new Set(Timehour)]
let uniquemin = [...new Set(Timeminute)]

//works
//var test = allTime.includes("07:20:00");
    //console.log(test)

const timeall = Object.values(allTime);
let timeValues = [...new Set(timeall)];

const groupSimilarStarters = timeValues => {
    let res = [];
    res = timeValues.reduce((acc, val, ind) => {
        const firstChar = el => {
            return (el || '').split(':')[0];
        }
        if(firstChar(val) === firstChar(timeValues[ind - 1])){
            acc[acc.length - 1].push(val);
        }else{
            acc.push([val]);
        };
        return acc;
    }, []);
    return res;
}
const timegroups=groupSimilarStarters(timeValues);


var seven = timegroups[0];
    //console.log(seven);

//var test = allTime.includes(seven);
    //console.log(test)
//if (seven.some(function(v) { return allTime.indexOf(v) >= 0; })) {
//    console.log(`Match using "${allTime}"`);
//} else {
//    console.log(`No match using "${allTime}"`);
//}
TFlist=[];
for (i=0; i < allTime.length; i++) {
    if (seven.some(w => allTime[i].includes(w)) == true) {
        TFlist.push(allTime[i]);
    }
}
//above and below results are the same
var res = allTime.filter(item => timegroups[0].includes(item));

//var res2 = (allTime.timegroups[0]);

    //results= allTime.filter(TFlist);
    //console.log(res2);
    //console.log(TFlist);
//var test2 = seven.every(w => allTime.includes(w));
    //console.log(test2)
   // console.log(timegroups[0])

    d3.select('.selectButton')
        .selectAll('myOptions') //all the dropdown options add all names
        .data(allName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })

    //.enter embeds all the data into dropdown

    d3.select('.selectDate')
        .selectAll('myOptions')
        .data(allDate).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })

    d3.select('.selectHour')
        .selectAll('myOptions')
        .data(allTime).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })

    d3.select('.selectMinute')
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

    function wtf(Name, date, range1, range2){
        const laura = data.filter(function (d) {
            return d.Name == Name && d.Date == date && d.Time == range1 && d.Time == range2
        })
        return laura;
    }


    //Color Scale for different names
    const myColor = d3.scaleOrdinal().domain(allName).range(d3.schemeSet2)

    //Grabs all trime from 7:00-7:50
    var try0=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[0].indexOf(d.Time) >= 0
    })

    var try1=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[1].indexOf(d.Time) >= 0
    })

    var try2=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[2].indexOf(d.Time) >= 0
    })

    var try3=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[3].indexOf(d.Time) >= 0
    })

    var try4=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[4].indexOf(d.Time) >= 0
    })

    var try5=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[5].indexOf(d.Time) >= 0
    })


    var try6=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[6].indexOf(d.Time) >= 0
    })

    var try7=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[7].indexOf(d.Time) >= 0
    })

    var try8=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[8].indexOf(d.Time) >= 0
    })

    var try9=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[9].indexOf(d.Time) >= 0
    })

    var try10=data.filter(function(d,i){
        //for (i=0; i <= Array.from(24); i++) this for loop doesn't work
        return timegroups[10].indexOf(d.Time) >= 0
    })

    const alltry = [try1, try2, try3, try4, try5] // data from time 7:00-12:50
    console.log(alltry)

    //console.log(timegroups.length)
//for (i=0; i < allTime.length; i++) {
   // hr = allTime[i].includes("08");

    const circles = svg
        .selectAll("circle")
        .data(try1.filter(function (d) {
           // var time0=d.Time.filter(item => timegroups[0].includes(item))
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
    function update(selectOption, selectOption2, selectOption3) {
        const filter_data = data.filter(function (d) {
            return d.Name == selectOption && d.Date == selectOption2 && d.Time == allTime.filter(item => timegroups[selectOption3-1].includes(item))
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
            d3.select('.selectHour').on('change', function (event, d) {
                const selectedHour = d3.select(this).property('value')
               // update(selectedGroup, selectedDate, selectedHour)
                d3.select('.selectMinute').on('change', function(event, d){
                    const selectedMinute = d3.select(this).property('value')
                    console.log(wtf(selectedGroup, selectedDate, selectedHour, selectedMinute))
                })
            })
        })
    })
})