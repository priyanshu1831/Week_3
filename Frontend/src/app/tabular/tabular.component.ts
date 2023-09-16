import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css']
})
export class TabularComponent {
  leaveRequests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:8080/tabledata')
      .subscribe(
        (data: any) => {
          this.leaveRequests = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
