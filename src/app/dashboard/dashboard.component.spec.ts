import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { LoginRecordsService } from '../login-records.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: LoginRecordsService;

  let defaultUsers: any[];
  let logInUser: any = {};

  let loginServiceStub: Partial<LoginRecordsService>;
  let loginRecordService: LoginRecordsService;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ DashboardComponent ]
  //   })
  //   .compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(DashboardComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    defaultUsers = [
      { email: 'Test@test.com', password: 'Testing12' },
      { email: 'frosty@snow.com', password: 'SnowMan12' },
      { email: 'captain@shield.com', password: 'aMerica12' }
    ];

    loginServiceStub = {
      users: defaultUsers,
      loggedInUser: logInUser,

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

            logInUser = element;
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
      declarations: [DashboardComponent],
      providers: [{ provide: LoginRecordsService, useValue: loginServiceStub }]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // UserService from the root injector
    service = TestBed.inject(LoginRecordsService);

    //service.validateLoginCredential('Test@test.com', 'Testing12');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should failed to display correct logged in user info', () => {
    service.validateLoginCredential('Test@test.com', 'Testing12');
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();
    // console.log(`Logged In As: ${component.loggedInID}`);
    expect(logInUser.loggedInID).not.toEqual('Frosty@test.com');
  });

  it('should display correct logged in user info', () => {
    const valid = service.validateLoginCredential(
      'frosty@snow.com',
      'SnowMan12'
    );
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();

    expect(logInUser.email).toEqual('frosty@snow.com');
  });
});
