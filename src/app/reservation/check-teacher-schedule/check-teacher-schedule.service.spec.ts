import { TestBed, inject } from '@angular/core/testing';

import { CheckTeacherScheduleService } from './check-teacher-schedule.service';

describe('CheckTeacherScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckTeacherScheduleService]
    });
  });

  it('should be created', inject([CheckTeacherScheduleService], (service: CheckTeacherScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
