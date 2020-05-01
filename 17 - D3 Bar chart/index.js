
/*fetch('https://api.covid19api.com/summary')
  .then(response => {
    return response.json();
  })
  .then((data) => {
    console.log(data);*/
    let c = document.getElementById('c');
  //c.textContent = JSON.stringify(data);
  let dataset = [['UK',600],['R', 100],['Jggfh',200]];//data.Countries.map(c => [c.Country, c.TotalConfirmed]);
  //c.textContent = JSON.stringify(dataset);
  let padding = 30;
  let height = 300;
  let width=300;
  var maxDataValue = d3.max(dataset, d=> d[1]);

    const xScale = d3.scaleLinear()
                     .domain([0, dataset.length*10])
                     .range([0, width - padding*2]);

    const linearScale = d3.scaleLinear()
     .domain([0,d3.max(dataset, (d) => d[1])])
                     .range([0 , height - padding*2]);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[1])])
                     .range([height - padding*2 , 0]);

    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d,i) =>  i*10 + padding )
       .attr("y",(d) => height - linearScale(d[1]  )-padding)
       .attr('width', '8')
       .attr('height', (d,i)=> linearScale(d[1]))
       .attr('fill', '#00D6D6')
       .attr("rx",'2');

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) =>  (d[0] + "," + linearScale(d[1])))
       .attr("x", (d,i) => i * 10 + padding)
       .attr("y", (d) => height - linearScale(d[1]) - padding)

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
       .attr("transform",'translate('+padding+','+ (height - padding)  +")")
       .call(xAxis);

    svg.append('g')
    .attr('transform', 'translate('+padding +' ,'+padding+')')
    .call(yAxis);
   


 // });
 