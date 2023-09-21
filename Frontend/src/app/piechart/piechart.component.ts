import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  public devopsChart: any;
  public itChart: any;
  public devopsChartData: any[] = [];
  public itChartData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDataForPieChartDevOps();
    this.getDataForPieChartIT();
  }

  createDevOpsChart() {
    Chart.register(...registerables);
    this.devopsChart = new Chart("devopsChart", {
      type: 'pie',
      data: {
        labels: this.devopsChartData.map(item => item.leave_type),
        datasets: [{
          label: 'Leave Types',
          data: this.devopsChartData.map(item => item.leave_id),
          backgroundColor: [
            'red',
            'pink',
            'green',
          ],
          hoverOffset: 4 
        }],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
              display: true,
              text: 'Pie Chart For DevOps',
              padding: {
                  top: 10,
                  bottom: 30
              }
          }
      }
      }
    });
  }

  createITChart() {
    Chart.register(...registerables);
    this.itChart = new Chart("itChart", {
      type: 'pie',
      data: {
        labels: this.itChartData.map(item => item.leave_type),
        datasets: [{
          label: 'Leave Types',
          data: this.itChartData.map(item => item.leave_id),
          backgroundColor: [
            'red',
            'pink',
            'green',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
              display: true,
              text: 'Pie Chart For IT',
              padding: {
                  top: 10,
                  bottom: 30
              }
          }
      }
      }
    });
  }

  getDataForPieChartDevOps() {
    this.http.get<any[]>('http://localhost:8080/piechart/devops')
      .subscribe(
        (data) => {
          this.devopsChartData = data;
          this.createDevOpsChart();
        },
        (error) => {
          console.error('Error fetching DevOps data:', error);
        }
      );
  }

  getDataForPieChartIT() {
    this.http.get<any[]>('http://localhost:8080/piechart/it')
      .subscribe(
        (data) => {
          this.itChartData = data;
          this.createITChart();
        },
        (error) => {
          console.error('Error fetching IT data:', error);
        }
      );
  }
}
