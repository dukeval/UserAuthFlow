import { Component, OnInit } from '@angular/core';
import { LoginRecordsService } from '../login-records.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  valid: boolean = true;
  emailValid: boolean = true;
  passwordValid: boolean = true;
  passwordMatch: boolean = true;
  termsAndCondition: boolean = true;
  firstnameValid: boolean = true;
  lastnameValid: boolean = true;

  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private service: LoginRecordsService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      first: new FormControl(''),
      last: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      termsAndCondition: new FormControl('', [Validators.required])
    });
  }

  registerUser() {
    debugger;
    //(register: any) {
    this.valid = true;
    this.emailValid = true;
    this.firstnameValid = true;
    this.lastnameValid = true;
    this.passwordMatch = true;
    this.passwordValid = true;
    this.termsAndCondition = true;

    // if (
    //   register.form.controls.email.value == '' ||
    //   register.form.controls.email.value == undefined
    // )
    //   this.emailValid = false;
    // else if (
    //   register.form.controls.password.value !=
    //   register.form.controls.confirmPassword.value
    // )
    //   this.passwordMatch = false;
    // else if (!register.form.controls.termsAndCondition.value)
    //   this.termsAndCondition = false;

    if (
      this.formGroup &&
      this.formGroup.valid &&
      this.emailValid &&
      this.passwordMatch &&
      this.passwordValid &&
      this.termsAndCondition
    ) {
      this.valid = this.service.addNewUser(this.formGroup); //register.form.controls);

      if (this.valid) this.router.navigate(['login']);
    }
    // debugger;
    // if (this.formGroup && this.formGroup.valid) {
    //   this.valid = this.service.addNewUser(register.form.controls);

    //   if (this.valid) this.router.navigate(['login']);
    // }
  }
}
