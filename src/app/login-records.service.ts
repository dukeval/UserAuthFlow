import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRecordsService {
  users: any[] = [
    { email: 'Test@test.com', password: 'Test12' },
    { email: 'frosty@snow.com', password: 'SnowMan' },
    { email: 'captain@shield.com', password: 'aMerica' }
  ];

  loggedInUser: any = {};

  constructor() {}

  getUsers(): any[] {
    return this.users;
  }

  addNewUser(newUserProfile: any): boolean {
    if (this.registeringUserValid(newUserProfile)) {
      this.users.push({
        email: newUserProfile.controls.email.value,
        password: newUserProfile.controls.password.value
      });
      return true;
    }

    return false;
  }

  validateLoginCredential(username: string, password: string): boolean {
    let valid: boolean = false;

    this.users.forEach(element => {
      if (
        username.toLowerCase() == element.email.toLowerCase() &&
        password == element.password
      ) {
        valid = true;
        this.loggedInUser = element;
      }
    });

    return valid;
  }

  registeringUserValid(userProfile: any): boolean {
    let valid: boolean = true;

    if (
      userProfile.controls.email.value == '' ||
      userProfile.controls.email.value == undefined
    )
      valid = false;
    else if (
      userProfile.controls.password.value !=
      userProfile.controls.confirmPassword.value
    )
      valid = false;
    else if (!userProfile.controls.termsAndCondition.value) valid = false;

    return valid;
  }
}
