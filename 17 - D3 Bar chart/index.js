
fetch('https://api.covid19api.com/summary')
  .then(response => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
   // let c = document.getElementById('c');
  //c.textContent = JSON.stringify(data);
  let dataset = data.Countries.map(c => [c.Country, c.TotalConfirmed]);
  //c.textContent = JSON.stringify(dataset);
    //[['UK',390],['R', 303],['Jggfh',204]];
  let padding = 30;
  let height = 600;
  let width=680;
  var maxDataValue = d3.max(dataset, d=> d[1]);


    const xScale = d3.scaleLinear()
                     .domain([0, maxDataValue])
                     .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
                      .domain([0, maxDataValue])
                     .range([height - padding, padding]);
let svg =  d3.select('section')
      .append("svg")
      .attr("width", width)
      .attr("height", height);

const xAxis = d3.axisBottom(xScale);
    svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

const yAxis = d3.axisLeft(yScale);
    svg.append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .call(yAxis);
      
function getXAxesShiftForBar(i){
    return  xScale(i ) * padding;
}
svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
       .attr("x", (d, i) => getXAxesShiftForBar(i))
       .attr("y", (d, i) =>height -  yScale(d[1]) - padding)
       .attr("width", 25)
       .attr("height", (d, i) => yScale(d[1]))
       .attr("fill", "navy");

   svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) => d[0])
       .attr("x", (d, i) => getXAxesShiftForBar(i))
       .attr("y", (d, i) => height -  yScale(d[1]) );
  
       
    

  });
 