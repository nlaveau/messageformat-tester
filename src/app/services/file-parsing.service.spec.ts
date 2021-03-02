import { TestBed } from '@angular/core/testing';

import { FileParsingService } from './file-parsing.service';

describe('FileParsingService', () => {
  let service: FileParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
