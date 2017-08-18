import { TestBed, inject } from '@angular/core/testing';

import { RegisterBookingService } from './register-booking.service';

describe('RegisterBookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterBookingService]
    });
  });

  it('should be created', inject([RegisterBookingService], (service: RegisterBookingService) => {
    expect(service).toBeTruthy();
  }));
});
