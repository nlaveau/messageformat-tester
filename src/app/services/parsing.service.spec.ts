import { TestBed } from '@angular/core/testing';

import { ParsingService } from './parsing.service';

describe('ParsingServiceService', () => {
  let service: ParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
