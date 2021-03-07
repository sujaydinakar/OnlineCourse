import { TestBed } from '@angular/core/testing';

import { SecureUserInnerPagesGuard } from './secure-user-inner-pages.guard';

describe('SecureUserInnerPagesGuard', () => {
  let guard: SecureUserInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureUserInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
