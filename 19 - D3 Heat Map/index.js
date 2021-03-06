fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
  .then(response => {
    return response.json();
  })
  .then((data) => {

function mouseOverHandler(d,i){     
            //console.log('over');

            var extracted1 = JSON.stringify(d).split(",")
                            .join('<br/>')
                            .substring(1);
    d3.select('#tooltip').attr('data-year', d.year)
                .style('opacity', '1')
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY + 'px')
               
                .html(extracted1.substring(0, extracted1.length - 2));}
    
function mouseOutEventHandler(d){
           // console.log('out');
            d3.select('#tooltip').transition()
                .duration(200)
                .style('opacity', 0);}
    
 function mouseMovingHandler (d,i) {
        //console.log('move');
    tooltip.style("top", d3.event.pageY+"px").style("left", d3.event.pageX + 'px');}
    
  let leftPadding = 70;
  let topPadding = 115;
  let padding = 30;
  let height = 600;
  let width = 1200;
  let innerHeight = height - padding - topPadding;
  let innerWidth = width - padding - leftPadding;
    
  var colorScale = d3.scaleLinear().domain([1,10])
                    .range(['#4C34C5', '#FFCA28']);
    
    var section = d3.select('section');
    var svg = section
            .append('svg')
            .attr('class', 'graph')
            .attr("width", width)
            .attr("height", height);
    var header = svg.append('g') ;

    header.append('text')
        .attr('x', innerWidth/2)
        .attr('y', '30')
        .text('Monthly Global Land-Surface Temperature')
        .attr('id', 'title');
    header.append('text')
        .attr('id','description')
        .attr('x', innerWidth/2)
        .attr('y', '60')
        .text('1753 - 2015: base temperature 8.66℃');
                   
   var group =   svg.append('g')
        .attr('id', 'group')
        .attr('transform', 'translate(' + leftPadding + ', '+topPadding+')')
        .style('pointer-events', 'all');
    
   var years = data.monthlyVariance.reduce((acc, x) => {
       
            if(acc.includes(x.year)){
                return acc;
            }
            acc.push(x.year);
       return acc;
    },[]);
    
 
var tooltip = d3.select('body').append('div')
            .attr("id", "tooltip")
            .style('opacity', '0')
            .style('position', 'absolute');

var xScale = d3.scaleLinear().domain(d3.extent(years)).range([0,innerWidth]);

   var xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d')); 
   group.append('g')
        .attr('id','x-axis')
        .attr('stroke-width', '1')
        .attr('transform', 'translate('+0+','+(innerHeight )+')')
        .call(xAxis);
    var months = ['January', 'February', 'March', 'April', 'May','June','July', 'August','September','October','November', 'December'];
    
    var yScale = d3.scaleLinear().domain([1,12]).range([0, innerHeight]);
    
    var yAxis = d3.axisLeft(yScale).tickFormat((d,i)=> months[i]);
    
      group.append('g')
        .attr('stroke-width', '1')
        .attr('id','y-axis')
        .attr('transform', 'translate('+0+','+0+')')
        .call(yAxis);
    
var dataset = data.monthlyVariance.map(x=> {
    var obj={};
    obj.year= x.year;
    obj.month= x.month;
    obj.temp= data.baseTemperature + x.variance;
    return obj;
});
    
group.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('data-month', d=> d.month)
    .attr('data-year', d=> d.year)
    .attr('data-temp', d=> d.temp)
    .attr('x',d => xScale(d.year))
    .attr('y', d => yScale(d.month - 1))
    .attr('width',d=> xScale(d.year) - xScale(d.year - 1))
    .attr('height', innerHeight/12)
    .attr('fill', d=> colorScale(d.temp))
    .on('mouseover', mouseOverHandler)
    .on('mouseout',  mouseOutEventHandler )
    .on('mousemove', mouseMovingHandler);
    
   /* 
    

    group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('fill', d=> d.Doping ? 'red' :'blue')
        .attr('data-xvalue', d => d.Year)
        .attr('data-yvalue', d => new Date(d.Seconds * 1000) )
        .attr('cx', d=>  xScale(d.Year))
        .attr('cy', d=>{
                let time = times.find( t =>t[1] == d.Seconds);     
                return yScale(time[0]);})
        .attr('r', '5px')       
        .on('mouseover', mouseOverHandler)
        .on('mouseout',  mouseOutEventHandler )
        .on('mousemove', mouseMovingHandler);
    

    let colors = [{color:'blue', text: 'No doping registered'}, 
                 {color:'red', text: 'Doping registered'}];
   var legend= group.append('g')
    .attr('id', 'legend');
    
    legend.selectAll(".legend-label")
  .data(colors)
  .enter()
  .append("circle")
    .attr("cx", xScale(minMaxYears[1] -4))
    .attr("cy", function(d,i){ return innerHeight*2/3 + i*30}) 
    .attr("r", 7)
    .style("fill", function(d){ return d.color;})


legend.selectAll(".legend-label")
  .data(colors)
  .enter()
  .append("text")
    .attr("x", xScale(minMaxYears[1] -4) +20 )
    .attr("y", function(d,i){ return  innerHeight*2/3 + i*30}) 

    .text(function(d){ return d.text})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .style( 'text-decoration', 'underline')
    .style('text-decoration-color', '#595185');*/
})