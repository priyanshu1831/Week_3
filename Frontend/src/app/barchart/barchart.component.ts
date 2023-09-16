import { Component } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  public chart: any;
  public BarChartData: any[] = []; // Store the data from the backend here

  constructor(private http: HttpClient) {} // Inject the HttpClient

  ngOnInit(): void {
    this.getDataForBarChart();
  }

  createChart() {
    Chart.register(...registerables);

    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.BarChartData.map(item => item.ManagerName),
        datasets: [{
          label: 'My First Dataset',
          data: this.BarChartData.map(item => item.Count), 
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',
            'purple',
            'navy blue',
            'cyan',
            'neon'
          ],
        }],
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  // Fetch data from the backend
  getDataForBarChart() {
    this.http.get<any[]>('http://localhost:8080/barchart') 
      .subscribe(
        (data) => {
          this.BarChartData = data;
          this.createChart();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
