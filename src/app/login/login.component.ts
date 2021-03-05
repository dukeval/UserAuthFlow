import { Component, OnInit } from '@angular/core';
import { LoginRecordsService } from '../login-records.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginValid: boolean = false;

  loginVerification(login: any) {
    this.loginValid = this.service.validateLoginCredential(
      login.form.controls.userName.value,
      login.form.controls.password.value
    );

    if (this.loginValid) {
      this.route.navigate(['dashboard']);
    }
  }

  constructor(private service: LoginRecordsService, private route: Router) {}

  ngOnInit(): void {}
}
