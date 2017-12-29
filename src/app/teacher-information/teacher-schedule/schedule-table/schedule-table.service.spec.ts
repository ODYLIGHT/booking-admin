import { TestBed, inject } from '@angular/core/testing';

import { ScheduleTableService } from './schedule-table.service';

describe('ScheduleTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleTableService]
    });
  });

  it('should be created', inject([ScheduleTableService], (service: ScheduleTableService) => {
    expect(service).toBeTruthy();
  }));
});
