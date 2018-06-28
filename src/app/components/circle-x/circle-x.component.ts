import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { TEMPERATURES } from '../../shared';

@Component({
  selector: '[app-circle-x]',
  templateUrl: './circle-x.component.html',
  styleUrls: ['./circle-x.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CircleXComponent implements OnInit {

  private chartX: any;

  constructor() { }

  ngOnInit() {
    let dumArray = [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 300, y: 100 }, { x: 400, y: 100 }, { x: 400, y: 100 }, { x: 500, y: 100 }, { x: 600, y: 100 }, { x: 700, y: 100 }];
    let gradData = [{ x: 100, grad: 0 }, { x: 200, grad: 25 }, { x: 300, grad: 33 }, { x: 400, grad: 50 }, { x: 500, grad: 75 }, { x: 600, grad: 88 }, { x: 700, grad: 100 }];

    let maxValue = Math.max.apply(Math, dumArray.map(function (item) { return item.y; }));
    let minValue = Math.min.apply(Math, dumArray.map(function (item) { return item.y; }));
    let scale = d3.scaleLinear()
          .domain([minValue, maxValue])
          .range([35, 25]);

    this.chartX= d3.select("#circleX");

    let gradX = this.chartX
      .append("defs").selectAll("linearGradient").data(gradData).enter()
      .append("linearGradient")
      .attr("id", function (d) { return "gradX" + d.x})
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "100%")
      .attr("y2", "0%")
      gradX.append("stop")
      .attr("offset", function (d) { return d.grad + "%" })
      .attr("stop-color", function (d) { return "red"; })
      gradX.append("stop")
      .attr("offset", function (d) { return (d.grad) + "%" })
      .attr("stop-color", "white");

      let line = d3.line<any>()
      .x(function (d) { return d.x }) 
      .y(function (d) { return scale(d.y) });



    this.chartX.append('path')
      .datum(dumArray)
      .attr('class', 'line')
      .style('fill', 'none')
      .style('stroke', "red")
      .style('stroke-width', '0.5')
      .attr('d', line);


      this.chartX.selectAll('.dotX')
      .data(dumArray)
      .enter()
      .append('circle')
      .attr('class', 'dotX')
      .attr('cx', d => d.x)
      .attr('cy', d => scale(d.y))
      .attr('r', 15)
      .style("stroke", "red")
      .style("fill", d => {
        let returnColor;
        returnColor = "url(#gradX" + d.x + ")"
        return returnColor;
        });

}

}
