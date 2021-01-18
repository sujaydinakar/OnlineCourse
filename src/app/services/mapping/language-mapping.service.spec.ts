import { TestBed } from '@angular/core/testing';

import { LanguageMappingService } from './language-mapping.service';

describe('LanguageMappingService', () => {
  let service: LanguageMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
