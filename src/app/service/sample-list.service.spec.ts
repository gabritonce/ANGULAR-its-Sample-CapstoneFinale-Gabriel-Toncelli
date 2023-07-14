import { TestBed } from '@angular/core/testing';

import { SampleListService } from './sample-list.service';

describe('SampleListService', () => {
  let service: SampleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
