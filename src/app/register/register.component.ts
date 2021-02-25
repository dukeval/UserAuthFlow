import { Component, OnInit } from '@angular/core';
import { LoginRecordsService } from '../login-records.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginRecordsService]
})
export class RegisterComponent implements OnInit {
  valid: boolean = true;
  emailValid: boolean = true;
  passwordValid: boolean = true;
  passwordMatch: boolean = true;
  termsAndCondition: boolean = true;
  firstnameValid: boolean = true;
  lastnameValid: boolean = true;

  constructor(private service: LoginRecordsService, private router: Router) {}

  ngOnInit(): void {}

  registerUser(register: any) {
    this.valid = true;
    this.emailValid = true;
    this.firstnameValid = true;
    this.lastnameValid = true;
    this.passwordMatch = true;
    this.passwordValid = true;
    this.termsAndCondition = true;

    if (
      register.form.controls.email.value == '' ||
      register.form.controls.email.value == undefined
    )
      this.emailValid = false;
    else if (
      register.form.controls.password.value !=
      register.form.controls.confirmPassword.value
    )
      this.passwordMatch = false;
    else if (!register.form.controls.termsAndCondition.value)
      this.termsAndCondition = false;

    if (
      this.emailValid &&
      this.passwordMatch &&
      this.passwordValid &&
      this.termsAndCondition
    ) {
      this.valid = this.service.addNewUser(register.form.controls);

      if (this.valid) this.router.navigate(['login']);
    }
  }
}