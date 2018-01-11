import { TestBed, inject } from '@angular/core/testing';

import { BookingTableService } from './booking-table.service';

describe('BookingTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingTableService]
    });
  });

  it('should be created', inject([BookingTableService], (service: BookingTableService) => {
    expect(service).toBeTruthy();
  }));
});
