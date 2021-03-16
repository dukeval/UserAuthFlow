import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { LoginRecordsService } from './login-records.service';
import { RegisterComponent } from './register/register.component';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

describe('LoginRecordsService', () => {
  let service: LoginRecordsService;
  let registerComponent: RegisterComponent;
  let loginComponent: LoginComponent;
  let registerFixture: ComponentFixture<RegisterComponent>;
  let loginFixture: ComponentFixture<LoginComponent>;

  const registerSpy = jasmine.createSpyObj('RegisterComponent', [
    'navigateByUrl'
  ]);
  let loginSpy = jasmine.createSpyObj(
    { registeringUserValid: null },
    { validateLoginCredential: null }
  );

  //loginSpy.registeringUserValid.returnValue(false);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    service = new LoginRecordsService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [RegisterComponent, LoginComponent],
      providers: [
        { provide: LoginRecordsService, useValue: loginSpy },
        { provide: RegisterComponent, userValue: registerSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    registerFixture = TestBed.createComponent(RegisterComponent);
    registerComponent = registerFixture.componentInstance;
    registerComponent.ngOnInit();

    loginFixture = TestBed.createComponent(LoginComponent);
    loginComponent = loginFixture.componentInstance;
  });

  it('should be created', () => {
    expect(loginSpy).toBeTruthy();
  });

  it('should have initial User count of 3', () => {
    expect(service.getUsers().length).toEqual(3);
  });

  it('should return false for formGroup with missing Password', () => {
    //let email = registerComponent.form.controls['email'];
    registerComponent.formGroup.controls.email.setValue('test@test.com');
    registerComponent.formGroup.controls.password.setValue('');
    registerComponent.formGroup.controls.confirmPassword.setValue('test');
    registerComponent.formGroup.controls.termsAndCondition.setValue(true);

    //expect(registerComponent.formGroup.valid).toBeFalse();

    expect(
      service.registeringUserValid(registerComponent.formGroup)
    ).toBeFalsy();
  });

  it('should return true for formGroup', () => {
    //let email = registerComponent.form.controls['email'];
    registerComponent.formGroup.controls.email.setValue('test@test.com');
    registerComponent.formGroup.controls.password.setValue('testing12');
    registerComponent.formGroup.controls.confirmPassword.setValue('testing12');
    registerComponent.formGroup.controls.termsAndCondition.setValue(true);

    expect(registerComponent.formGroup.valid).toBeTruthy();
  });

  it('should return false when passed in credentials are not found', () => {
    expect(service.validateLoginCredential('test', 'test')).toBeFalsy();
  });

  it('should return true when passed in credentials are not found', () => {
    expect(
      service.validateLoginCredential('test@test.com', 'Test12')
    ).toBeTruthy();
  });

  it('should add a new user', () => {
    //let email = registerComponent.form.controls['email'];
    registerComponent.formGroup.controls.email.setValue('test@test.com');
    registerComponent.formGroup.controls.password.setValue('testing12');
    registerComponent.formGroup.controls.confirmPassword.setValue('testing12');
    registerComponent.formGroup.controls.termsAndCondition.setValue(true);

    service.addNewUser(registerComponent.formGroup);
    expect(service.getUsers().length).toEqual(4);
  });
});
