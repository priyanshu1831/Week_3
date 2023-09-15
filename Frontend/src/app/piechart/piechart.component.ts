import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public chart: any;

ngOnInit(): void {
    this.createChart();
  }

createChart() {
    Chart.register(
      ...registerables);

this.chart = new Chart("myChart", {
  type: 'pie',
  data: {
    labels: ['Red', 'Pink', 'Green', 'Yellow', 'Orange', 'Blue'],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 240, 100, 432, 253, 34],
      backgroundColor: [
        'red',
        'pink',
        'green',
        'yellow',
        'orange',
        'blue',
      ],
      hoverOffset: 4
    }],
  },
  options: {
    aspectRatio: 2.5
  }
});

}
}