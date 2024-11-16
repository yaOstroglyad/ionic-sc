import { TestBed } from '@angular/core/testing';

import { PurchaseHistoryUtilsService } from './purchase-history-utils.service';

describe('PurchaseHistoryUtilsService', () => {
  let service: PurchaseHistoryUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseHistoryUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
