import { TestBed } from '@angular/core/testing';

import { KeycloakRedirectService } from './keycloak-redirect.service';

describe('KeycloakRedirectService', () => {
  let service: KeycloakRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
