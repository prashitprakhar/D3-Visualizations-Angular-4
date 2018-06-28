import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { D3LineGraphComponent } from './components/d3-line-graph/d3-line-graph.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MultiLineChartsComponent } from './components/multi-line-charts/multi-line-charts.component';
import { CirclePointLineComponent } from './components/circle-point-line/circle-point-line.component';
import { CircleXComponent } from './components/circle-x/circle-x.component';
import { CircleYComponent } from './components/circle-y/circle-y.component';
import { MultilineScatterplotComponent } from './components/multiline-scatterplot/multiline-scatterplot.component';


@NgModule({
  declarations: [
    AppComponent,
    D3LineGraphComponent,
    BarChartComponent,
    MultiLineChartsComponent,
    CirclePointLineComponent,
    CircleXComponent,
    CircleYComponent,
    MultilineScatterplotComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
