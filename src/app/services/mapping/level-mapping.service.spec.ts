import { TestBed } from '@angular/core/testing';

import { LevelMappingService } from './level-mapping.service';

describe('LevelMappingService', () => {
  let service: LevelMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
