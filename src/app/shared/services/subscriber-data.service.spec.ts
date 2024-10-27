import { TestBed } from '@angular/core/testing';

import { SubscriberDataService } from './subscriber-data.service';

describe('SubscriberDataService', () => {
  let service: SubscriberDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriberDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
