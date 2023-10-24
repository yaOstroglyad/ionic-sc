import { TestBed } from '@angular/core/testing';

import { AddMoreDataService } from './add-more-data.service';

describe('AddMoreDataService', () => {
  let service: AddMoreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMoreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
