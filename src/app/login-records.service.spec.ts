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
});
