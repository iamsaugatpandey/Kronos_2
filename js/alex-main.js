h = (document.querySelector('.POK_timemap').clientHeight) / 2 + (document.querySelector('.POK_timemap').clientHeight) / 1.8;
w = 1.79 * h;
min_long = 24.82386787;
max_long = 24.91035698;
min_lat = 36.04482337;
max_lat = 36.09568917;

const suspects = ["Inga Ferro", "Loreto Bodrogi", "Isia Vann", "Hennie Osvaldo", "Minke Mies", "Ruscella Mies Haber"];
const administration = ["Mat Bramar", "Anda Ribera", "Rachel Pantanal", "Linda Lagos",
                "Ruscella Mies Haber", "Carla Forluniau", "Cornelia Lais"];
const engineering = ["Marin Onda", "Isande Borrasca", "Axel Calzas", "Kare Orilla", "Elsa Orilla",
                        "Brand Tempesta", "Lars Azada", "Felix Balas", "Lidelse Dedos", "Birgitta Frente",
                        "Adra Nubarron", "Gustav Cazar", "Vira Frente"];
const executives = ["Orham Strum", "Ada Campo-Corrente", "Ingrid Barranco", "Sten Sanjorge Jr.", "Willem Vasco-Pais"];
const facilities = ["Bertrand Ovan", "Emile Arpa", "Varro Awelon", "Dante Coginian", "Albina Hafon",
                        "Benito Hawelon", "Claudio Hawelon", "Henk Mies", "Valeria Morlun", "Adan Morlun",
                        "Cecilia Morluniau", "Irene Nant", "Dylan Scozzese"];
const infotech = ["Linnea Bergen", "Lucas Alcazar", "Isak Baza", "Nils Calixto", "Sven Flecha"];
const security = ["Kanon Herrero", "Varja Lagos", "Stenig Fusil", "Minke Mies", "Hennie Osvaldo",
                    "Isia Vann", "Edvard Vann", "Felix Resumir", "Loreto Bodrogi", "Hideki Cocinaro", "Inga Ferro"];

let suspects_selected = false;
let admin_selected = false;
let engineers_selected = false;
let execs_selected = false;
let facilities_selected = false;
let it_selected = false;
let security_selected = false;

let day = "6";
let time = "13";

const getDateCompareString = function (num) {
    if (num < 10)
        return '2014-01-0' + num;
    else
        return '2014-01-' + num;
}
//"hh:mm:00"
const getTimeCompareString = function(hours, mins){
    let retString = '';
    if(hours < 10) {
        retString = '0' + hours + ':';
    } else {
        retString = hours + ':';
    }
    if(mins < 10) {
        retString = retString + '0' + mins + ':00';
    } else {
        retString = retString + mins + ':00';
    }
    return retString;
}

// takes in d.Time, uses time var to see if it's relevant
const isInTimeFrame = function(dataTime){
    if(dataTime === getTimeCompareString(time - 1, 5) ||
        dataTime === getTimeCompareString(time - 1, 10) ||
        dataTime === getTimeCompareString(time - 1, 15) ||
        dataTime === getTimeCompareString(time - 1, 20) ||
        dataTime === getTimeCompareString(time - 1, 25) ||
        dataTime === getTimeCompareString(time - 1, 30) ||
        dataTime === getTimeCompareString(time - 1, 35) ||
        dataTime === getTimeCompareString(time - 1, 40) ||
        dataTime === getTimeCompareString(time - 1, 45) ||
        dataTime === getTimeCompareString(time - 1, 50) ||
        dataTime === getTimeCompareString(time - 1, 55) ||
        dataTime === getTimeCompareString(time, 0)) {
            return true;
    }
    return false;
}

const legend = d3.select('#name_legend').append("g")

const getOpacityFromTime = function(dataTime){
    if(dataTime === getTimeCompareString(time - 1, 5)){return .083;}
    if(dataTime === getTimeCompareString(time - 1, 10)){return .166;}
    if(dataTime === getTimeCompareString(time - 1, 15)){return .25;}
    if(dataTime === getTimeCompareString(time - 1, 20)){return .33;}
    if(dataTime === getTimeCompareString(time - 1, 25)){return .416}
    if(dataTime === getTimeCompareString(time - 1, 30)){return .5;}
    if(dataTime === getTimeCompareString(time - 1, 35)){return .583;}
    if(dataTime === getTimeCompareString(time - 1, 40)){return .67;}
    if(dataTime === getTimeCompareString(time - 1, 45)){return .75;}
    if(dataTime === getTimeCompareString(time - 1, 50)){return .833;}
    if(dataTime === getTimeCompareString(time - 1, 55)){return .916}
    if(dataTime === getTimeCompareString(time, 0)){return 1;}
}

const frame = d3.select(".POK_timemap")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

const vis = frame
    .append("g");


d3.json('data/all_data.json').then(function (data) {

    const allName = new Set(data.map(function (d) {
        return d.Name
    }))


    const refreshCircles = function() {
        d3.selectAll('circle')
            .attr("visibility", function (d) {
                //check for being in the right date and time
                if (d.Date === getDateCompareString(day) && isInTimeFrame(d.Time)) {
                    if ((suspects_selected && suspects.includes(d.Name)) ||
                        (admin_selected && administration.includes(d.Name)) ||
                        (engineers_selected && engineering.includes(d.Name)) ||
                        (execs_selected && executives.includes(d.Name)) ||
                        (facilities_selected && facilities.includes(d.Name)) ||
                        (it_selected && infotech.includes(d.Name)) ||
                        (security_selected && security.includes(d.Name))) {
                        return "visible";
                    } else {
                        return "hidden";
                    }
                } else {
                    return "hidden";
                }
            })
            .style("opacity", function(d){
                return getOpacityFromTime(d.Time);
            });
    }
    // d3.select('.selectButton')
    //     .selectAll('myOptions')
    //     .data(allName).enter().append('option').text(function (d) { return d; }).attr('value', function (d) { return d; })


    d3.selectAll("input[name='day']").on("change", function () {
        day = this.value;
        refreshCircles();
    });
    d3.selectAll("input[name='time']").on("change", function () {
        time = this.value;
        refreshCircles();
    });



    d3.selectAll("input[name='group']").on("change", function () {
        if(this.value === 'suspects'){suspects_selected = !suspects_selected;}
        if(this.value === 'admins'){admin_selected = !admin_selected;}
        if(this.value === 'engineers'){engineers_selected = !engineers_selected;}
        if(this.value === 'execs'){execs_selected = !execs_selected;}
        if(this.value === 'facilities'){facilities_selected = !facilities_selected;}
        if(this.value === 'itStaff'){it_selected = !it_selected;}
        if(this.value === 'security'){security_selected = !security_selected;}
        refreshCircles();
    })
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
            .html(d.Time + "<br/>" + d.Name)
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


    // Color Scale for different names
    const myColor = d3.scaleOrdinal().domain(allName).range(d3.schemeSet2)


    const circles = vis
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 6)
        .style("fill", function (d) {
            return myColor(d.Name)
        })
        .style("stroke", "black")
        .style("stroke-width", 2)
        .attr("visibility", "hidden")
        .attr("cy", function (d) {
            return (((max_lat - d.Lat) / (max_lat - min_lat)) * h);
        })
        .attr("cx", function (d) {
            return (((d.Long - min_long) / (max_long - min_long)) * w);
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
})