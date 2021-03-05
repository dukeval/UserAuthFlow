import { Component, OnInit } from '@angular/core';
import { LoginRecordsService } from '../login-records.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInID: string | null = '';

  constructor(private service: LoginRecordsService) {}

  ngOnInit(): void {
    this.loggedInID = this.service.loggedInUser.email; //sessionStorage.getItem('userName');
  }
}
