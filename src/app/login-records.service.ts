import { Injectable } from '@angular/core';
import { element } from 'protractor';

@Injectable()
export class LoginRecordsService {
  private users: any[] = [
    { email: 'Test', password: 'Test12' },
    { email: 'frosty', password: 'SnowMan' },
    { email: 'captain', password: 'aMerica' }
  ];

  loggedInUser: any[] = [];

  constructor() {}

  getUsers(): any[] {
    this.users = JSON.parse(sessionStorage.getItem('users')!);

    return this.users;
  }
  addNewUser(newUserProfile: any): boolean {
    if (this.registeringUserValid(newUserProfile)) {
      this.users.push({
        email: newUserProfile.email.value,
        password: newUserProfile.password.value
      });
      sessionStorage.setItem('users', JSON.stringify(this.users));
      return true;
    }

    return false;
  }

  validateLoginCredential(username: string, password: string): boolean {
    let valid: boolean = false;

    this.getUsers();

    this.users.forEach(element => {
      if (
        username.toLowerCase() == element.email.toLowerCase() &&
        password == element.password
      ) {
        valid = true;
        this.loggedInUser.push(element);
      }
    });

    return valid;
  }

  registeringUserValid(userProfile: any): boolean {
    let valid: boolean = true;

    if (userProfile.email.value == '' || userProfile.email.value == undefined)
      valid = false;
    else if (userProfile.password.value != userProfile.confirmPassword.value)
      valid = false;
    else if (!userProfile.termsAndCondition.value) valid = false;

    return valid;
  }
}
