import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  
  ngOnInit() {
    var sales = [
      {
        "day": "Monday",
        "sales": 42000,
        "bestSeller": "lemonade"
      },
      {
        "day": "Tuesday",
        "sales": 56000,
        "bestSeller": "lemonade"
      },
      {
        "day": "Wednesday",
        'sales': 37000,
        'bestSeller': 'water'
      },
      {
        'day': 'Thursday',
        'sales': 143000,
        'bestSeller': 'iced tea'
      },
      {
        'day': 'Friday',
        'sales': 259000,
        'bestSeller': 'iced tea'
      },
      {
        'day': 'Saturday',
        'sales': 278000,
        'bestSeller': 'lemonade'
      },
      {
        'day': 'Sunday',
        'sales': 270000,
        'bestSeller': 'pink lemonade'
      }
    ];

    // const quaterData = [
    //   {
    //     ''
    //   }
    // ]
    // tslint:disable-next-line:no-unused-expression
    interface ResponseData { 
      'day': '' 
    };
   
    var width = 400; var height = 100;
    var svg = d3.select('body')
      .append('svg')
      .attr('width', 1000)
      .attr('background-color', "#FFFFFF")

    d3.json<ResponseData>('http://localhost:4200/assets/sales.json')
      .then((data) => {
        console.log(data);
        svg.selectAll('rect')
          .data(sales)
          .enter()
          .append('rect')
          .on('click', function(f){
            alert(f.day)
          })
          .attr('width', width / sales.length - 10)
          .attr('height', function (e, i) {
            return e.sales / 1000
          })
          .attr('x', function (e, i) {
            console.log(e);
             console.log(i)
            return i * (width / sales.length)
          })
          .attr('y', function (e, i) {
            return height - e.sales / 1000
          })
          .attr('fill', '#eee')
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr('fill', function (c) {
            console.log(c.sales)
            if(c.sales >= 57000) {return 'pink'}
            else{ return 'violet'; }
            // if(c.sales >= 37000) return
            // var max = d3.max(data, function (e) {
            //   return e.sales
            // })
            //console.log(c)
          })
      });
  }
}
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