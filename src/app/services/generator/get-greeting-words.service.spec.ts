import { TestBed } from '@angular/core/testing';

import { GetGreetingWordsService } from './get-greeting-words.service';

describe('GetGreetingWordsService', () => {
  let service: GetGreetingWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGreetingWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
