import { TestBed } from '@angular/core/testing';

import { SecureDefaultInnerPagesGuard } from './secure-default-inner-pages.guard';

describe('SecureDefaultInnerPagesGuard', () => {
  let guard: SecureDefaultInnerPagesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecureDefaultInnerPagesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
