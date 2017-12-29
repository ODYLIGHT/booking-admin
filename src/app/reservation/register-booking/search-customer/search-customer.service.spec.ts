import { TestBed, inject } from '@angular/core/testing';

import { SearchCustomerService } from './search-customer.service';

describe('SearchCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchCustomerService]
    });
  });

  it('should be created', inject([SearchCustomerService], (service: SearchCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
