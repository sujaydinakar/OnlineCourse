import { TestBed } from '@angular/core/testing';

import { InstructorGuardGuard } from './instructor-guard.guard';

describe('InstructorGuardGuard', () => {
  let guard: InstructorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InstructorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
