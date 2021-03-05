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
        email: newUserProfile.email.value,
        password: newUserProfile.password.value
      });
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
        this.loggedInUser = element;
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
