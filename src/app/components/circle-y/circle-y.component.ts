import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: '[app-circle-y]',
  templateUrl: './circle-y.component.html',
  styleUrls: ['./circle-y.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CircleYComponent implements OnInit {

  private chartY: any;

  constructor() { }

  ngOnInit() {
    let dumArray = [{ x: 100, y: 200 }, { x: 200, y: 200 }, { x: 300, y: 200 }, { x: 400, y: 200 }, { x: 400, y: 200 }, { x: 500, y: 200 }, { x: 600, y: 200 }, { x: 700, y: 200 }];
    let gradData = [{ x: 100, grad: 100 }, { x: 200, grad: 88 }, { x: 300, grad: 75}, { x: 400, grad: 50 }, { x: 500, grad: 33 }, { x: 600, grad: 25 }, { x: 700, grad: 0 }];
  
    let maxValue = Math.max.apply(Math, dumArray.map(function (item) { return item.y; }));
    let minValue = Math.min.apply(Math, dumArray.map(function (item) { return item.y; }))
    let scale = d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([85, 75]);
    
    this.chartY= d3.select("#circleY")

    let gradY = this.chartY
    .append("defs").selectAll("linearGradient").data(gradData).enter()
    .append("linearGradient")
    .attr("id", function (d) { return "gradY" + d.x})
    .attr("x1", "100%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "0%")
    gradY.append("stop")
    .attr("offset", function (d) { return d.grad + "%" })
    .attr("stop-color", function (d) { return "blue"; })
    gradY.append("stop")
    .attr("offset", function (d) { return (d.grad) + "%" })
    .attr("stop-color", "white");

    let line = d3.line<any>()
      .x(function (d) { return d.x }) 
      .y(function (d) { return scale(d.y) })

    this.chartY.append('path')
      .datum(dumArray)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', "blue")
      .style('stroke-width', '0.5')
      .attr('d', line)

      this.chartY.selectAll('.dotY')
      .data(dumArray)
      .enter()
      .append('circle')
      .attr('class', 'dotY')
      .attr('cx', d => d.x)
      .attr('cy', d => scale(d.y))
      .attr('r', 15)
      .style("stroke", "blue")
      .style("fill", d => {
        let returnColor;
        returnColor = "url(#gradY" + d.x + ")"
        return returnColor;
      })
  }

}
