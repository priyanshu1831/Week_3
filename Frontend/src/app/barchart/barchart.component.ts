import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
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
        labels: this.BarChartData.map(item => item.manager_name), 
        datasets: [{
          label: 'Leave Distribution of Managers',
          data: this.BarChartData.map(item => item.count),
          backgroundColor: [
            '#FF5733',
            '#FFC300',
            '#DAF7A6',
            '#C70039',
            '#900C3F',
            '#3D00FF',
            '#220DFF',
            '#00D8FF',
            '#00FF99',
            '#FF00FF'
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