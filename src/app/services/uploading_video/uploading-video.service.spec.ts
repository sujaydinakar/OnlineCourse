import { TestBed } from '@angular/core/testing';

import { UploadingVideoService } from './uploading-video.service';

describe('UploadingVideoService', () => {
  let service: UploadingVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadingVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
