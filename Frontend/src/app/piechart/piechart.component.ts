import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public chart: any;
  public pieChartData: any[] = []; // Store the data from the backend here

  constructor(private http: HttpClient) {} // Inject the HttpClient

  ngOnInit(): void {
    this.getDataForPieChart();
  }

  createChart() {
    Chart.register(...registerables);

    this.chart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: this.pieChartData.map(item => item.TeamName), // Use TeamName from the fetched data
        datasets: [{
          label: 'My First Dataset',
          data: this.pieChartData.map(item => item.Leaves), // Use Leaves from the fetched data
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

  // Fetch data from the backend
  getDataForPieChart() {
    this.http.get<any[]>('http://localhost:8080/piechart') 
      .subscribe(
        (data) => {
          this.pieChartData = data;
          this.createChart();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
  