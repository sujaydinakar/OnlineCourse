import { TestBed } from '@angular/core/testing';

import { CourseMappingService } from './course-mapping.service';

describe('CourseMappingService', () => {
  let service: CourseMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
