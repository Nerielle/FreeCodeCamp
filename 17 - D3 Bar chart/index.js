
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => {
    return response.json();
  })
  .then((data) => {

  
  let dataset = data.data;
  console.log(dataset);
  let padding = 30;
  let height =600;
  let width=800;
    let innerHeight = height - padding;
    let innerWidth = width - padding;
    
  let minDate = data.from_date;
  let maxDate = data.to_date;
    
  let xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([0, innerWidth]);
  let yScale = d3.scaleLinear()
                .domain([d3.min(dataset, d => d[1]), d3.max(dataset, d => d[1])])
                .range([innerHeight, 0]);
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    
 var svg = d3.select('section')
            .append('svg')
            .attr('class', 'graph')
            .attr("width", width)
            .attr("height", height);
    svg.append('g')
        .attr('id','x-axis')
        //.attr('class', 'left-bottom-margin')
        .attr('transform', 'translate(0,'+innerHeight+')')
        .call(xAxis);
    svg.append('g')
        .attr('id','y-axis')
        //.attr('class', 'left-bottom-margin')
        .call(yAxis);
    
    var barWidth = innerWidth/dataset.length;
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i)=> i * barWidth)
        .attr('y', (d, i)=> yScale(d[1]))
        .attr('width', barWidth)
        .attr('height', d=> innerHeight - yScale(d[1]))
        .attr("rx",'2');
        
    
            
    
/*  var maxConfirmedValue = d3.max(dataset, d=> d);

//    const xScale = d3.scaleLinear()
//                     .domain([0, dataset.length*25])
//                     .range([0, width - padding]);
    var dates = data.data.map(date=> new Date(date[0]));
    
    const linearScale = d3.scaleLinear()
     .domain([0,d3.max(dataset, (d) => d[1])])
                     .range([0 , height - padding ]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([height - padding , 0]);
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    


  var xMax = new Date(d3.max(dates));
  xMax.setMonth(xMax.getMonth() + 3);
  var xScale = d3.scaleTime()
    .domain([d3.min(dates), xMax])
    .range([0, width]);
    svg.append("g")
        .attr('id','x-axis')
       .attr("transform",'translate('+padding+','+ (height - padding)  +")")
       .call(xAxis);

    svg.append('g')
       .attr('id','y-axis')
    .attr('transform', 'translate('+padding +' ,'+padding+')')
    .call(yAxis);
   
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d,i) =>  i*25 + padding )
       .attr("y",(d) => height - linearScale(d[1]  )-padding)
       .attr('width', '20')
       .attr('height', (d,i)=> linearScale(d[1]))
       .attr('fill', '#00D6D6')
       .attr("rx",'2')
    .attr('data-date', d=>d[0])
    .attr('data-gdp', d=>d[1])
        .attr('class', 'bar');*/


//    svg.selectAll("text")
//       .data(dataset)
//       .enter()
//       .append("text")
//       .text((d) =>  (d))
//       .attr("x", (d,i) => i * 25 + padding)
//       .attr("y", (d) => height - linearScale(d) - padding)




  });
 