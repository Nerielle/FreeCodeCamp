
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => {
    return response.json();
  })
  .then((data) => {

  
  let dataset = data.data;
  //console.log(dataset);
    
/*     var years = dataset.reduce(((years, subArray)=>{
      let year = new Date(subArray[0]).getFullYear();
     
      if(years.includes(year)){
          return years;
      }
      else{
          years.push(year);
          return years;
      }
      
  }),[]);
  console.log(years);*/
  
    function mouseOverHandler(d){
        conslole.log('mouseover');
  console.log(this, d, i);

  
    let tooltip = d3.select('#tooltip');
        tooltip.html(new Date(d[0]).toLocaleDateString() + '<br/> ' + d[1]);
      tooltip.style('opacity', '1')
        .style('left', (i*barWidth +leftPadding) + 'px');
        
     
    
}  
  
    
  let leftPadding = 50;
  let topPadding = 20;
  //let bottomPadding = 50px;
  let padding = 30;
  let height =600;
  let width=800;
    let innerHeight = height - padding - topPadding;
    let innerWidth = width - padding - leftPadding;
    
  let minDate = new Date(data.from_date);
  let maxDate = new Date(data.to_date);

    let xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, innerWidth]);
  let yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => d[1])])
                .range([innerHeight, 0]);
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    
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
        //.attr('class', 'left-bottom-margin')
        .attr('transform', 'translate('+0+','+(innerHeight )+')')
        .call(xAxis);
    group.append('g')
        .attr('stroke-width', '1')
        .attr('id','y-axis')
        .attr('transform', 'translate('+0+','+0+')')
        //.attr('class', 'left-bottom-margin')
        .call(yAxis);
    
    var barWidth = innerWidth/dataset.length;
    group.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-date', d=>d[0])
        .attr('data-gdp', d=>d[1])
        .attr('x', (d, i)=> xScale(new Date(d[0])))
        .attr('y', (d, i)=> yScale(d[1]))
        .attr('width', barWidth)
        .attr('height', d=> innerHeight - yScale(d[1]))
        .attr("rx",'2')
        .on('mouseover', function mouseOverHandler(d,i){     
            let tooltip = d3.select('#tooltip');
            tooltip.html(new Date(d[0]).toLocaleDateString() + '<br/> ' + d[1]);
            tooltip.style('opacity', '1')
                .style('left', (i * barWidth + leftPadding) + 'px')
               .style('top', d3.event.pageY + 'px');})
        .on('mouseout',   function mouseOutEventHandler(d){
            d3.select('#tooltip').transition()
                .duration(200)
                .style('opacity', 0);});
})