import { TestBed } from '@angular/core/testing';

import { LoginRecordsService } from './login-records.service';

describe('LoginRecordsService', () => {
  let service: LoginRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial User count of 3', () => {
    expect(service.getUsers().length).toEqual(3);
  });

  // it('should return false for registeringUser', () => {
  //   expect(service.registeringUserValid()).toBeFalsy();
  // });
});
