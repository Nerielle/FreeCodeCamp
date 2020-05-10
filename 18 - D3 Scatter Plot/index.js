
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then(response => {
    return response.json();
  })
  .then((data) => {

  

  
function mouseOverHandler(d,i){     
            //console.log('over');
            d3.select('#tooltip').style('opacity', '1')
                .style('left', (i * barWidth + leftPadding) + 'px')
                .style('top', d3.event.pageY + 'px')
                .attr('data-date', d[0])
                .html(new Date(d[0]).toLocaleDateString() + '<br/> ' + d[1]);}
    
function mouseOutEventHandler(d){
           // console.log('out');
            d3.select('#tooltip').transition()
                .duration(200)
                .style('opacity', 0);}
    
 function mouseMovingHandler (d,i) {
        //console.log('move');
    tooltip.style("top", d3.event.pageY+"px").style("left",(i * barWidth + leftPadding) + 'px');}
    
  let leftPadding = 70;
  let topPadding = 20;
  let padding = 30;
  let height =600;
  let width=800;
    let innerHeight = height - padding - topPadding;
    let innerWidth = width - padding - leftPadding;
    
  let minDate = new Date(d3.min(data, d=> d.Year)).getYear();
  let maxDate = new Date(d3.max(data, d=> d.Year)).getYear();

    let xScale = d3.scaleTime()               
                .range([0, innerWidth]);
    
    var timeFormat = '%M:%S';
    let xAxis = d3.axisBottom(xScale);
    
    var times  = data.map( t=> {
        
        var ms = t.Seconds * 1000;
        var date = new Date(ms);
        console.log(t.Time, date, d3.timeFormat(timeFormat)(date));
        return date;
    })
    
    let yScale = d3.scaleTime()
                .domain(d3.extent(times))
                .range([innerHeight, 0]);
    
    var filteredTimeTicks = times.filter(t => t.getSeconds()%5 == 0);
    let yAxis = d3.axisLeft(yScale).tickValues(  filteredTimeTicks).tickFormat(t=>d3.timeFormat(timeFormat)(t));
    
 var section = d3.select('section');
    var svg = section
            .append('svg')
            .attr('class', 'graph')
            .attr("width", width)
            .attr("height", height);
 var group =   svg.append('g')
        .attr('id', 'group')
        .attr('transform', 'translate(' + leftPadding + ', '+topPadding+')')
        .style('pointer-events', 'all');
    
    var tooltip = d3.select('body').append('div')
                .attr("id", "tooltip")
                .style('opacity', '0')
                .style('position', 'absolute');
    
    group.append('g')
        .attr('id','x-axis')
        .attr('stroke-width', '1')
        .attr('transform', 'translate('+0+','+(innerHeight )+')')
        .call(xAxis);
    group.append('g')
        .attr('stroke-width', '1')
        .attr('id','y-axis')
        .attr('transform', 'translate('+0+','+0+')')
        .call(yAxis);
    

    group.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('data-xvalue', d=>d.Year)
        .attr('data-yvalue', d=>d.Time)
        .attr('rx', (d, i)=> xScale(d.Year))
        .attr('ry', (d, i)=> yScale(d.Time))
        .attr('r', '5px');
      /* 
        .on('mouseover', mouseOverHandler)
        .on('mouseout',  mouseOutEventHandler )
        .on('mousemove', mouseMovingHandler);*/
})