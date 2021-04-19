import { TestBed } from '@angular/core/testing';

import { ServiceLoginTokenService } from './service-login-token.service';

describe('ServiceLoginTokenService', () => {
  let service: ServiceLoginTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLoginTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
