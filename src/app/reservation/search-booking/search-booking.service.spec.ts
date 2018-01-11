import { TestBed, inject } from '@angular/core/testing';

import { SearchBookingService } from './search-booking.service';

describe('SearchBookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchBookingService]
    });
  });

  it('should be created', inject([SearchBookingService], (service: SearchBookingService) => {
    expect(service).toBeTruthy();
  }));
});
