// @TODO: YOUR CODE HERE!



// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// reading CSV
d3.csv("data.csv").then(function (stateData) {

  // Print the tvData
  console.log(stateData);


  //Add X axis
  var x = d3.scaleLinear()
    .domain([6, 22])
    .range([0, chartWidth]);
  // svg.append('g')
  //   .attr("transform", "translate(0, " + chartHeight +")")
  //   .call(d3.axisBottom(x));

  //Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 28])
    .range([chartHeight, 0]);
  // svg.append('g')
  //   .call(d3.axisLeft(y));

  //Create Axis functions
  var bottomAxis = d3.axisBottom(x);
  var leftAxis = d3.axisLeft(y);

  //Append axes to chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);



  //create labels 
  svg.selectAll("text")
    .data(stateData)
    .enter()
    .append("text")
    .attr("x", d => x(d.poverty) - 7)
    .attr("y", d => y(d.healthcare) + 4)
    .text(d => d.abbr)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "black");

  //create circles
  svg.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.poverty))
    .attr("cy", d => y(d.healthcare))
    .attr("r", 12)
    .attr("fill-opacity", "0.5")
    .style("fill", "#1f3d7b");






  // Create axes labels
  //create Y axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left + 50)
    .attr("x", 0 - (svgHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%) ");
}).catch(function (error) {
  console.log(error);

  //create X axis label
  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
}).catch(function (error) {
  console.log(error);




});
