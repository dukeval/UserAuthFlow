import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { LoginRecordsService } from '../login-records.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: LoginRecordsService;

  const loginSpy = jasmine.createSpyObj('LoginRecordsService', [
    'navigateByUrl'
  ]);

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: LoginRecordsService, useValue: loginSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    service = TestBed.inject(LoginRecordsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component.test()).toEqual('T'); //.toBeTruthy();
  // });
});
