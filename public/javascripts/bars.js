/*BAR CHART*/
var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleBand()
    .rangeRound([0, width], .1, .3);

var y = d3.scaleLinear()
    .range([0, height]);

var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y)
    .ticks(5);

var svg = d3.select(".barchart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var mutationTypes = getListOfMutationTypes(dataObj.all_data);
var countOfTypes = countProperties(mutationTypes);
console.log("THIS IS THE COUNT: " + countOfTypes);

if(countOfTypes) {
    var jsonCountObj = JSON.parse(countOfTypes);

    jsonCountObj.forEach(function(d) {
        d.type = d.type;
        d.count = +d.count;
    });

  x.domain(jsonCountObj.map(function(d) { return d.type; }));
  y.domain([d3.max(jsonCountObj, function(d) { return d.count; }), 0]);

  svg.append("text")
      .attr("class", "title")
      .attr("x", 50)
      .attr("y", -26)
      .text("Count of Chromosome Mutations per Type");

  svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll(".tick text")
      .call(wrap, x.bandwidth());

  svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis);

  var bar = svg.selectAll("bar")
      .data(jsonCountObj)
    .enter()

      bar.append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.type) + 20; })
      .attr("width", x.bandwidth()-20)
      .attr("y", function(d) { return y(parseInt(d.count)); })
      .attr("height", function(d) { return height - y(parseInt(d.count)); });

  bar.append("text")
      .attr("x", function(d) { return (x(d.type))+ x.bandwidth()/2;})
      .attr("y", function(d) { return y(d.count) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.count; });
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}