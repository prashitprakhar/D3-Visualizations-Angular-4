import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../../shared';

@Component({
  selector: 'app-d3-line-graph',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './d3-line-graph.component.html',
  styleUrls: ['./d3-line-graph.component.css']
})
export class D3LineGraphComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  //   const lineCoordinates = [
  //     {"x" : 1, "y": 5},
  //     {"x" : 20, "y": 20},
  //     {"x" : 40, "y": 10},
  //     {"x" : 60, "y": 40},
  //     {"x" : 80, "y": 5},
  //     {"x" : 100, "y": 60},
  //   ];

    title = 'Line Chart';

    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;

    constructor() {
        this.width = 900 - this.margin.left - this.margin.right;
        //this.width = 1000
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    ngOnInit() {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }

    private initSvg() {
        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        this.x = d3Scale.scaleLinear().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(STOCKS, (d) => d.x ));
        this.y.domain(d3Array.extent(STOCKS, (d) => d.y ));
    }

    private drawAxis() {

        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');
    }

    private drawLine() {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.x) )
            .y( (d: any) => this.y(d.y) );

        this.svg.append('path')
            .datum(STOCKS)
            .attr('class', 'line')
            .attr('d', this.line)
            .attr('fill', 'none');
    }

    // d3.select('body')
    //   .append('h1')
    //   .text('First Page of D3');
    // const WIDTH = 1000;
    // const HEIGHT = 700;
    // var svg = d3.select('body')
    //             .append('svg')  
    //             .attr('width', 1000)
    //             .attr('height', 600)
    //             .attr('background-color', 'black');

    // let x = d3.scaleLinear()
    //           .range([0, WIDTH]);
    
    // let y = d3.scaleLinear()
    //           .range([HEIGHT, 0]);
    
    // let xAxis = d3.line()


    //var width = 1000; var height = 800;
    //var line = d3.line()
    //             .x(function(d) {return d.x})


}

    //var svg = d3.select('body')
      // .append('svg')
      // .attr('width', 1000)
      // .attr('background-color', "#FFFFFF")

    // d3.json('http://localhost:4200/assets/lineCoords.json')
    //   .then((data) => {
    //     //console.log(data);
    //     svg.selectAll('line')
    //       .data([data])
    //       .enter()
    //       .append('line')
          
    //       //('x', data.x)
    //       // .style('fill', 'blue')
    //       // .style('opacity', 1);
    //   })

  //   let lineFunction = d3.svg.line()
  //                             .x(function(d) {return d.x})
  //                             .y(function(d) {return d.y})
  //                             .interpolate("linear");
  // }

// @Component({
//   moduleId: module.id,
//   selector: 'timeline',
//   templateUrl: 'timeline.component.html',
//   styles: [`
//     :host {
//         width: 100%;
//         display:block;
//     }
//     :host .axis path,
//     :host .axis line {
//         fill: none;
//         stroke: rgba(0, 0, 0, 0.2);
//         color: rgba(0, 0, 0, 0.2);
//         shape-rendering: crispEdges;
//     }

//     :host .axis text {
//         font-size: 20px;
//         fill: rgba(0, 0, 0, 0.9);
//     }

//     :host .color-label{
//         display: inline;
//     }
//     :host(.timeline) {
//         fill: none;
//         stroke: steelblue;
//         stroke-width: 2px;
//      }
//  `],
// })

// export class TimelineChartComponent implements OnInit {
//   private host;        // D3 object referencing host dom object
//   private svg;         // SVG in which we will print our chart
//   private margin;      // Space between the svg borders and the actual chart graphic
//   private width;       // Component width
//   private height;      // Component height
//   private xScale;      // D3 scale in X
//   private yScale;      // D3 scale in Y
//   private xAxis;       // D3 X Axis
//   private yAxis;       // D3 Y Axis
//   private htmlElement: HTMLElement; // Host HTMLElement
//   config: Array<TimelineChartConfig> = [];

//   /* Constructor, needed to get @Injectables */
//   constructor(private element: ElementRef) {
//     this.htmlElement = this.element.nativeElement;
//     this.host = D3.select(this.element.nativeElement);
//     let incomeTimeline = new TimelineChartConfig();
//     incomeTimeline.settings = {
//         interpolation: 'monotone'
//     }
//     let data = [
//             { x: "1-May-12", y: 58.13},
//             { x: "30-Apr-12", y: 53.98},
//             { x: "27-Apr-12", y: 67.00},
//             { x: "26-Apr-12", y: 89.70},
//             { x: "25-Apr-12", y: 99.00},
//             { x: "24-Apr-12", y: 130.28},
//             { x: "23-Apr-12", y: 166.70},
//             { x: "20-Apr-12", y: 234.98},
//             { x: "19-Apr-12", y: 345.44},
//             { x: "18-Apr-12", y: 443.34},
//             { x: "17-Apr-12", y: 543.70},
//             { x: "16-Apr-12", y: 580.13},
//             { x: "13-Apr-12", y: 605.23},
//             { x: "12-Apr-12", y: 622.77},
//             { x: "11-Apr-12", y: 626.20},
//             { x: "10-Apr-12", y: 628.44},
//             { x: "9-Apr-12", y: 636.23},
//             { x: "5-Apr-12", y: 633.68},
//             { x: "4-Apr-12", y: 624.31},
//             { x: "3-Apr-12", y: 629.32},
//             { x: "2-Apr-12", y: 618.63},
//             { x: "30-Mar-12", y: 599.55},
//             { x: "29-Mar-12", y: 609.86},
//             { x: "28-Mar-12", y: 617.62},
//             { x: "27-Mar-12", y: 614.48},
//             { x: "26-Mar-12", y: 606.98},
//         ];
//         incomeTimeline.dataset = data;
//         this.config.push(incomeTimeline);
//   }

//   ngOnInit(): void {
//      if (!this.config || this.config.length === 0) return;
//         this.setup();
//         this.buildSVG();
//         this.populate();
//         this.drawXAxis();
//         this.drawYAxis();
//   }

//   /* Will setup the chart container */
//   private setup(): void {
//     this.margin = { top: 20, right: 20, bottom: 40, left: 40 };
//     this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
//     this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
//     this.xScale = D3.scaleTime().range([0, this.width]);
//     this.yScale = D3.scaleLinear().range([this.height, 0]);
//   }

//   /* Will build the SVG Element */
//   private buildSVG(): void {
//     this.host.html('');
//     this.svg = this.host.append('svg')
//       .attr('width', this.width + this.margin.left + this.margin.right)
//       .attr('height', this.height + this.margin.top + this.margin.bottom)
//       .append('g')
//       .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
//   }
//   /* Will draw the X Axis */
//   private drawXAxis(): void {
//     this.xAxis = D3.axisBottom(this.xScale);
//     this.svg.append('g')
//       .attr('class', 'x axis')
//       .attr('transform', 'translate(0,' + this.height + ')')
//       .call(this.xAxis);
//   }

//   /* Will draw the Y Axis */
//   private drawYAxis(): void {
//     this.yAxis = D3.axisLeft(this.yScale)
//       .tickPadding(10);
//     this.svg.append('g')
//       .attr('class', 'y axis')
//       .call(this.yAxis)
//       .append('text')
//       .attr('transform', 'rotate(-90)');
//   }

//   /* Will get the Maximum value in Y */
//   private getMaxY(): number {
//     let maxValuesOfCharts = [];
//     this.config.forEach(data => maxValuesOfCharts.push(Math.max.apply(Math, data.dataset.map(d => d.y))));
//     return Math.max(...maxValuesOfCharts);
//   }

//   /* Will populate datasets into areas*/
//   private populate(): void {
//     let parseTime = D3.timeParse("%d-%b-%y");
//     this.config.forEach((timeline: any) => {
//       console.log("timeline config", timeline);
//       timeline.dataset.forEach((d: any) => d.x = parseTime(d.x));
//       this.xScale.domain(D3.extent(timeline.dataset, (d: any) => d.x));
//       this.yScale.domain([0, this.getMaxY()]);

//       let valueline = D3.line()
//         .x((d) => this.xScale(d.x))
//         .y((d) => this.yScale(d.y))

//       this.svg.append('path')
//         .datum(timeline.dataset)
//         .attr('class', 'timeline')
//         .attr('d', valueline);
//     });
//   }
// }



  // d3.select('div').append('h1')
  // .data(sales)
  // .enter()
  // .append('p')
  // .text(function(d) {
  //   return d.day;
  // });
  // ADDING JSON
  //    d3.json<ResponseData>('http://localhost:4200/assets/sales.json')
  // .then((data) => {
  //   console.log(data);
  //         d3.select('div').append('h1')
  //     .data(data)
  //     .enter()
  //     .append('p')
  //     .text(function(a) {
  //       return "On "+a.day +" sales was "+ a.sales
  //     });
  // });