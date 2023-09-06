import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

 

@Component({

  selector: 'app-showdata',

  templateUrl: './showdata.component.html',

  styleUrls: ['./showdata.component.css']

})

export class ShowdataComponent implements OnInit {
  leaveRequests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:8080/getData')
      .subscribe(
        (data: any) => {
          this.leaveRequests = data;
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }

  getFileLink(filename: string): string {
    return `http://localhost:8080/static/upload/${filename}`;
}

}
