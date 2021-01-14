import { TestBed } from '@angular/core/testing';

import { GenerateKeywordsService } from './generate-keywords.service';

describe('GenerateKeywordsService', () => {
  let service: GenerateKeywordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateKeywordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
