import { TestBed, inject } from '@angular/core/testing';

import { TeacherScheduleService } from './teacher-schedule.service';

describe('TeacherScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherScheduleService]
    });
  });

  it('should be created', inject([TeacherScheduleService], (service: TeacherScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
