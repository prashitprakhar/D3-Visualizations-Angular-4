import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { TEMPERATURES } from '../../shared';
@Component({
  selector: 'app-multi-line-charts',
  templateUrl: './multi-line-charts.component.html',
  styleUrls: ['./multi-line-charts.component.css']
  //encapsulation: ViewEncapsulation.None
})
export class MultiLineChartsComponent implements OnInit {

  title = 'Multi-Series Line Chart';

  data: any;

  svg: any;
  //margin = {top: 20, right: 80, bottom: 30, left: 50};
  margin = {top: 10, right: 40, bottom: 30, left: 50};
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  public line;
  public minPoint;
  public maxPoint;
  public minMaxPointsArray: any[] = [];
  public pointsXValuesHolder: any[] = [];
  public pointsYValuesHolder: any[] = [];
  public allPointsArray: any[] = [];
  public fullCoordsMin: any[] = [];
  public fullCoordsMax: any[] = [];
  public idInUse;
  public xCoordsHolder: any[] = [];
  public yCoordsHolder: any[] = [];
  public xMinCoordsHolder: any[] = [];
  public yMinCoordsHolder: any[] = [];
  
  constructor() { }

  ngOnInit() {
    //this.data = TEMPERATURES.map((v) => v.values.map((v) => v.date ))[0];
        //.reduce((a, b) => a.concat(b), []);
        this.data = TEMPERATURES.map((v) => v.values.map((v) => v.x-10))[0];

    // let maxValue = Math.max.apply(Math, dumArray.map(function (item) { return item.y; }));
    // let minValue = Math.min.apply(Math, dumArray.map(function (item) { return item.y; }));
        this.initChart();
        this.drawAxis();
        this.drawPath();
        this.drawHighLow();
  }

  private initChart(): void {
    this.svg = d3.select('svg');

    this.width = this.svg.attr('width') - this.margin.left - this.margin.right; 
    this.height = this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.x = d3.scaleLinear().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.z = d3.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    // this.line = d3.line()
    //     .x( (d: any) => this.x(d.x) )
    //     .y( (d: any) => this.y(d.y) );

    this.line = d3.line()
      .x((d: any) => this.x(d.x)
      )
      .y((d: any) => this.y(d.y)
    );

    this.x.domain([
      d3Array.min(TEMPERATURES, function(c) { return d3Array.min(c.values, function(d) { return d.x - 10}); }),
      d3Array.max(TEMPERATURES, function(c) { return d3Array.max(c.values, function(d) { return d.x + 10}); }),
    ])

    this.y.domain([
        d3Array.min(TEMPERATURES, function(c) { return d3Array.min(c.values, function(d) { return d.y - 100; }); }),
        d3Array.max(TEMPERATURES, function(c) { return d3Array.max(c.values, function(d) { return d.y + 100; }); })
    ]);

    this.z.domain(TEMPERATURES.map(function(c) { return c.id; }));
}

private drawAxis(): void {
  this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

  this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#FFF')
      .text('Temperature, ºF');
}

private minMax(): any[] {
  TEMPERATURES.map((data) => {
    this.pointsXValuesHolder = [];
    this.pointsYValuesHolder = [];
    data.values.map((point) => {
      this.pointsXValuesHolder.push(point);
      this.pointsYValuesHolder.push(point.y);
    })
    this.minPoint = Math.min(...this.pointsYValuesHolder);
    this.fullCoordsMin = this.pointsXValuesHolder.find((data) => {
      return (data.y === this.minPoint)
    });
    this.maxPoint = Math.max(...this.pointsYValuesHolder);
    this.fullCoordsMax = this.pointsXValuesHolder.find((data) => {
      return data.y === this.maxPoint;
    });
    this.minMaxPointsArray.push({"id": data.id, "minCoords": this.fullCoordsMin, "maxCoords": this.fullCoordsMax})
  })
  return this.minMaxPointsArray;
}

private drawPath(): void {
  let minMaxValues = this.minMax();
  let city = this.g.selectAll('.city')
      .data(TEMPERATURES)
      .enter().append('g')
      .attr('class', 'city')
      .attr('fill', 'none');

    city.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.values))
      .style('stroke', (d) => {
        return this.z(d.id)});

    city.selectAll("dot")
      .data(minMaxValues)
      .enter().append("circle")
      .attr("r", 5)
      .attr("cx", (d) => {
        minMaxValues.forEach(data => {
          this.xCoordsHolder[data.id] = data.maxCoords.x
        });
        return this.x(+this.xCoordsHolder[d.id])
      })
      .attr("cy", (d) => { 
        minMaxValues.forEach(data => {
          this.yCoordsHolder[data.id] = data.maxCoords.y
        });
        return this.y(+this.yCoordsHolder[d.id])
      })

      // .attr("cx", (d) => { return this.x(+d.values[0].x); })
      // .attr("cy", (d) => { return this.y(+d.values[0].y); })
      .style('stroke', '#000')
      .style('fill', 'blue');

    city.selectAll("dot")
      .data(minMaxValues)
      .enter().append("circle")
      .attr("r", 5)
      .attr("cx", (d) => {
        minMaxValues.forEach(data => {
          this.xMinCoordsHolder[data.id] = data.minCoords.x;
        });
        return this.x(+this.xMinCoordsHolder[d.id])
      })
      .attr("cy", (d) => { 
        minMaxValues.forEach(data => {
          this.yMinCoordsHolder[data.id] = data.minCoords.y
        });
        return this.y(+this.yMinCoordsHolder[d.id])
      })
      .style('stroke', '#000')
      .style('fill', 'red');

    city.append('text')
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr('transform', (d) => 'translate(' + this.x(d.value.x) + ',' + this.y(d.value.y) + ')' )
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(function(d) { return d.id; });    
      
      
  // const symbols = d3Shape.symbol()
  //                 .type(d => (d[1]>0 ? d3Shape.symbolCircle : d3Shape.symbolDiamond))
  //                 .size((d, i) => (i % 2 ? 0 : 64));
  //console.log("Symbol : ",symbols);
  //this.minMax()

  // let city = this.g.append("circle")
  //             .selectAll("dot")
  //             .data(this.minMaxPointsArray.map((data) => {}))
  //             .enter()
              // .append("linearGradient")
              // .attr("id", function (d) { return "gradX" + d.x})
              // .attr("x1", "0%")
              // .attr("x2", "0%")
              // .attr("y1", "100%")
              // .attr("y2", "0%")
              // city.append("stop")
              // .attr("offset", function (d) { return d.grad + "%" })
              // .attr("stop-color", function (d) { return "red"; })
              // city.append("stop")
              // .attr("offset", function (d) { return (d.grad) + "%" })
              // .attr("stop-color", "white");



  

      //this.g.selectAll('dot')

  // this.g.selectAll('dot')
  //     .data(TEMPERATURES)
  //     .enter().append("circle")
  //     .attr("r", 4.5)
  //     .attr("cx", function(d) { console.log(d.values);
  //       return d.values.map((x) => { console.log(x.x); return x.x} )
  //     .attr("cy", function(d) { return d.values.y; });
  // city.selectAll('path')
  // .enter() .append('g')
  // .attr('class', 'circle')
  // //.attr('class', 'circle')
  // .attr('r', 4.5)
  // .attr('cx', 40)
  // .attr('cy', 560)
  // .style('stroke', '#000')




      //.style('stroke', (d) => this.z(d.id));

  // city.selectAll('.dot')
  // .enter()
  // .append('circle')
  //     .attr('r', 4.5)
  //     .attr('cx', 40)
  //     .attr('cy', 560)
      //.style('stroke', (d)=> this.z(d.id));
    //   .attr('cx', this.minMax().map((data) => { 
    //     console.log("Data Min Coords X: ",data.minCoords.x); 
    //     //console.log("Temperatures : ",TEMPERATURES); 
    //     return data.minCoords.x
    //   })
    // )
    // //)
    //   .attr("cy", this.minMax().map((data) => { 
    //     console.log("Data Min Coords Y: ",data.minCoords.y); 
    //     return data.minCoords.y})
    //   )
      
      //.style('color', '#000');

  // city.append("circle")
  //     .attr("r", 5.5)
  //     .attr("cx", this.minMax().map((data) => { return }))



}

drawHighLow(): void{
  this.g.selectAll('dot')
      .enter()
      .append('g')
      .attr('r', 40)
      .attr('cx', (d) => { console.log("Hello",d); return d.x})
      .attr('cy', (d) => { return d.y})
      .style('stroke', (d)=> this.z(d.id));
}

}
