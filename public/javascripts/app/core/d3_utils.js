require.register("core/d3_utils", function(exports, require, module) {
module.exports.createContiguousDays = function(timeframeDays, skipToday) {
  var currentDate, currentDay, days, i, j, ref;
  if (skipToday == null) {
    skipToday = true;
  }
  days = [];
  currentDate = new Date();
  currentDate.setUTCDate(currentDate.getUTCDate() - timeframeDays + 1);
  if (skipToday) {
    currentDate.setUTCDate(currentDate.getUTCDate() - 1);
  }
  for (i = j = 0, ref = timeframeDays; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    currentDay = currentDate.toISOString().substr(0, 10);
    days.push(currentDay);
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
  return days;
};

module.exports.createLineChart = function(containerSelector, chartLines, containerWidth) {
  var containerHeight, currentLine, currentYScale, d3line, endDay, height, i, j, k, keyHeight, len, len1, line, lineColor, margin, marks, results, startDay, svg, width, xAxis, xAxisHeight, xAxisRange, xRange, yAxis, yAxisRange, yAxisWidth, yRange, yScaleCount;
  if (!((chartLines != null ? chartLines.length : void 0) > 0 && containerSelector)) {
    return;
  }
  margin = 20;
  keyHeight = 20;
  xAxisHeight = 20;
  yAxisWidth = 40;
  if (!containerWidth) {
    containerWidth = $(containerSelector).width();
  }
  containerHeight = $(containerSelector).height();
  yScaleCount = 0;
  for (j = 0, len = chartLines.length; j < len; j++) {
    line = chartLines[j];
    if (line.showYScale) {
      yScaleCount++;
    }
  }
  svg = d3.select(containerSelector).append("svg").attr("width", containerWidth).attr("height", containerHeight);
  width = containerWidth - margin * 2 - yAxisWidth * yScaleCount;
  height = containerHeight - margin * 2 - xAxisHeight - keyHeight * chartLines.length;
  currentLine = 0;
  currentYScale = 0;
  marks = (function() {
    var k, results;
    results = [];
    for (i = k = 1; k <= 5; i = ++k) {
      results.push(Math.round(i * height / 5));
    }
    return results;
  })();
  yRange = d3.scale.linear().range([height, 0]).domain([0, height]);
  svg.selectAll(".line").data(marks).enter().append("line").attr("x1", margin + yAxisWidth * yScaleCount).attr("y1", function(d) {
    return margin + yRange(d);
  }).attr("x2", margin + yAxisWidth * yScaleCount + width).attr("y2", function(d) {
    return margin + yRange(d);
  }).attr("stroke", 'gray').style("opacity", "0.3");
  results = [];
  for (k = 0, len1 = chartLines.length; k < len1; k++) {
    line = chartLines[k];
    xRange = d3.scale.linear().range([0, width]).domain([
      d3.min(line.points, function(d) {
        return d.x;
      }), d3.max(line.points, function(d) {
        return d.x;
      })
    ]);
    yRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
    if (currentLine === 0) {
      startDay = new Date(line.points[0].day);
      endDay = new Date(line.points[line.points.length - 1].day);
      xAxisRange = d3.time.scale().domain([startDay, endDay]).range([0, width]);
      xAxis = d3.svg.axis().scale(xAxisRange);
      svg.append("g").attr("class", "x axis").call(xAxis).selectAll("text").attr("dy", ".35em").attr("transform", "translate(" + (margin + yAxisWidth * yScaleCount) + "," + (height + margin) + ")").style("text-anchor", "start");
    }
    if (line.showYScale) {
      lineColor = yScaleCount > 1 ? line.lineColor : 'black';
      yAxisRange = d3.scale.linear().range([height, 0]).domain([line.min, line.max]);
      yAxis = d3.svg.axis().scale(yRange).orient("left");
      svg.append("g").attr("class", "y axis").attr("transform", "translate(" + (margin + yAxisWidth * currentYScale) + "," + margin + ")").style("color", lineColor).call(yAxis).selectAll("text").attr("y", 0).attr("x", 0).attr("fill", lineColor).style("text-anchor", "start");
      currentYScale++;
    }
    svg.append("line").attr("x1", margin).attr("y1", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("x2", margin + 40).attr("y2", margin + height + xAxisHeight + keyHeight * currentLine + keyHeight / 2).attr("stroke", line.lineColor).attr("class", "key-line");
    svg.append("text").attr("x", margin + 40 + 10).attr("y", margin + height + xAxisHeight + keyHeight * currentLine + (keyHeight + 10) / 2).attr("fill", line.lineColor).attr("class", "key-text").text(line.description);
    svg.selectAll(".circle").data(line.points).enter().append("circle").attr("transform", "translate(" + (margin + yAxisWidth * yScaleCount) + "," + margin + ")").attr("cx", function(d) {
      return xRange(d.x);
    }).attr("cy", function(d) {
      return yRange(d.y);
    }).attr("r", 2).attr("fill", line.lineColor).attr("stroke-width", 1).attr("class", "graph-point").attr("data-pointid", function(d) {
      return "" + line.lineID + d.x;
    });
    d3line = d3.svg.line().x(function(d) {
      return xRange(d.x);
    }).y(function(d) {
      return yRange(d.y);
    }).interpolate("linear");
    svg.append("path").attr("d", d3line(line.points)).attr("transform", "translate(" + (margin + yAxisWidth * yScaleCount) + "," + margin + ")").style("stroke-width", line.strokeWidth).style("stroke", line.lineColor).style("fill", "none");
    results.push(currentLine++);
  }
  return results;
};
});

;
//# sourceMappingURL=/javascripts/app/core/d3_utils.js.map