import { TestBed } from '@angular/core/testing';

import { SecureAdminInnerPagesGuard } from './secure-admin-inner-pages.guard';

describe('SecureAdminInnerPagesGuard', () => {
  let guard: SecureAdminInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureAdminInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
