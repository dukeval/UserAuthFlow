import { Component, OnInit } from '@angular/core';
import { LoginRecordsService } from '../login-records.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginRecordsService]
})
export class LoginComponent implements OnInit {
  //dservice: any;
  loginValid: boolean = false;
  //password: any;

  loginVerification(login: any) {
    this.loginValid = this.service.validateLoginCredential(
      login.form.controls.userName.value,
      login.form.controls.password.value
    );

    if (this.loginValid) {
      sessionStorage.setItem('userName', login.form.controls.userName.value);
      this.route.navigate(['dashboard']);
    }
  }

  constructor(private service: LoginRecordsService, private route: Router) {
    //this.dservice = service;
  }

  ngOnInit(): void {}
}
