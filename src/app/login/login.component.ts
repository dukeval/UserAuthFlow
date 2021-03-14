import { Component, OnInit } from '@angular/core';
import { LoginRecordsService } from '../login-records.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginValid: boolean = false;
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  loginVerification() {
    console.log(this.formGroup);
    //login: any) {
    // this.loginValid = this.service.validateLoginCredential(
    //   login.form.controls.userName.value,
    //   login.form.controls.password.value
    // );

    if (this.formGroup) {
      this.loginValid = this.service.validateLoginCredential(
        this.formGroup.controls.username.value,
        this.formGroup.controls.password.value
      );
    }

    if (this.loginValid) {
      this.route.navigate(['dashboard']);
    }
  }

  constructor(private service: LoginRecordsService, private route: Router) {}

  ngOnInit(): void {}
}
