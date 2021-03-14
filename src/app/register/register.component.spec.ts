import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { LoginRecordsService } from '../login-records.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { analyzeAndValidateNgModules } from '@angular/compiler';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: LoginRecordsService;

  let loginServiceStub: Partial<LoginRecordsService>;

  const loginSpy = jasmine.createSpyObj('LoginRecordsService', [
    'navigateByUrl'
  ]);

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  let defaultUsers: any[];
  let loggedInUser: any = {};

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ReactiveFormsModule, FormsModule],
  //     declarations: [RegisterComponent],
  //     providers: [
  //       { provide: LoginRecordsService, useValue: loginSpy },
  //       { provide: Router, useValue: routerSpy }
  //     ]
  //   }).compileComponents();
  //   service = TestBed.inject(LoginRecordsService);
  // });

  beforeEach(() => {
    let loginRecordService: LoginRecordsService;
    defaultUsers = [
      { email: 'Test@test.com', password: 'Test12' },
      { email: 'frosty@snow.com', password: 'SnowMan' },
      { email: 'captain@shield.com', password: 'aMerica' }
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
      declarations: [RegisterComponent],
      providers: [
        { provide: LoginRecordsService, useValue: loginServiceStub },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    // UserService from the root injector
    service = TestBed.inject(LoginRecordsService);
  });

  // it('should create', () => {
  //   expect(component.test()).toEqual('T'); //.toBeTruthy();
  // });

  it('Should fail registered user', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    // fixture.componentInstance.formGroup.controls.email.setValue(
    //   'test@test.com'
    // );
    expect(
      service.registeringUserValid(fixture.componentInstance.formGroup)
    ).toBeFalsy();
  });

  it('Should fail register user with missing required field', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.formGroup.controls.first.setValue('Jude');

    fixture.componentInstance.formGroup.controls.last.setValue('Valerius');

    fixture.componentInstance.formGroup.controls.password.setValue('red');
    fixture.componentInstance.formGroup.controls.confirmPassword.setValue(
      'red'
    );
    fixture.componentInstance.formGroup.controls.termsAndCondition.setValue(
      true
    );

    expect(fixture.componentInstance.formGroup.valid).toBeFalsy();
  });

  it('Should fail registered user with incorrect min password length', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.formGroup.controls.first.setValue('Jude');

    fixture.componentInstance.formGroup.controls.last.setValue('Valerius');
    fixture.componentInstance.formGroup.controls.email.setValue(
      'test@test.com'
    );
    fixture.componentInstance.formGroup.controls.password.setValue('red');
    fixture.componentInstance.formGroup.controls.confirmPassword.setValue(
      'red'
    );
    fixture.componentInstance.formGroup.controls.termsAndCondition.setValue(
      true
    );

    expect(fixture.componentInstance.formGroup.valid).toBeFalsy();
  });

  it('Should fail registered user with mismatch password', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.formGroup.controls.first.setValue('Jude');

    fixture.componentInstance.formGroup.controls.last.setValue('Valerius');
    fixture.componentInstance.formGroup.controls.email.setValue(
      'test@test.com'
    );
    fixture.componentInstance.formGroup.controls.password.setValue('red');
    fixture.componentInstance.formGroup.controls.confirmPassword.setValue(
      'ready'
    );
    fixture.componentInstance.formGroup.controls.termsAndCondition.setValue(
      true
    );

    expect(
      service.registeringUserValid(fixture.componentInstance.formGroup)
    ).toBeFalsy();
  });

  it('Should register new user', () => {
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    fixture.componentInstance.formGroup.controls.first.setValue('Jude');

    fixture.componentInstance.formGroup.controls.last.setValue('Valerius');
    fixture.componentInstance.formGroup.controls.email.setValue(
      'test@test.com'
    );
    fixture.componentInstance.formGroup.controls.password.setValue(
      'ReadyToTest'
    );
    fixture.componentInstance.formGroup.controls.confirmPassword.setValue(
      'ReadyToTest'
    );
    fixture.componentInstance.formGroup.controls.termsAndCondition.setValue(
      true
    );

    expect(service.getUsers().length).toEqual(3);

    expect(
      service.addNewUser(fixture.componentInstance.formGroup)
    ).toBeTruthy();

    expect(service.getUsers().length).toEqual(4);
  });
});
