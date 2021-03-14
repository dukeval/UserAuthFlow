import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRecordsService } from '../login-records.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let service: LoginRecordsService;

  let defaultUsers: any[];
  let loggedInUser: any = {};

  let loginServiceStub: Partial<LoginRecordsService>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ReactiveFormsModule, FormsModule],
  //     declarations: [LoginComponent],
  //     providers: [{ provide: Router, useValue: routerSpy }]
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    let loginRecordService: LoginRecordsService;
    defaultUsers = [
      { email: 'Test@test.com', password: 'Testing12' },
      { email: 'frosty@snow.com', password: 'SnowMan12' },
      { email: 'captain@shield.com', password: 'aMerica12' }
    ];

    loginServiceStub = {
      users: defaultUsers,
      loggedInUser: loggedInUser,

      getUsers: () => {
        return defaultUsers;
      },
      addNewUser: newUserprofile => {
        defaultUsers.push({
          email: newUserprofile.controls.email.value,
          password: newUserprofile.controls.password.value
        });
        return true;
      },
      validateLoginCredential: (username, password) => {
        let valid: boolean = false;
        defaultUsers.forEach(element => {
          if (
            username.toLowerCase() == element.email.toLowerCase() &&
            password == element.password
          ) {
            valid = true;

            loggedInUser = element;
          }
        });
        return valid;
      },
      registeringUserValid: userProfile => {
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
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginRecordsService, useValue: loginServiceStub },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // UserService from the root injector
    service = TestBed.inject(LoginRecordsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fail login', () => {
    component.loginVerification();
    expect(component.loginValid).toBeFalsy();
  });

  it('should fail login with incorrect username and password', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.formGroup.controls.username.setValue('do');
    fixture.componentInstance.formGroup.controls.password.setValue(
      'theTesting12'
    );

    component.loginVerification();
    expect(component.loginValid).toBeFalsy();
  });

  it('should pass login with correct username and password', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.formGroup.controls.username.setValue(
      'Test@test.com'
    );
    fixture.componentInstance.formGroup.controls.password.setValue('Testing12');

    component.loginVerification();
    expect(component.loginValid).toBeTruthy();
  });
});
