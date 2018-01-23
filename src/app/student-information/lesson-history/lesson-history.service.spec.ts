import { TestBed, inject } from '@angular/core/testing';

import { LessonHistoryService } from './lesson-history.service';

describe('LessonHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonHistoryService]
    });
  });

  it('should be created', inject([LessonHistoryService], (service: LessonHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
