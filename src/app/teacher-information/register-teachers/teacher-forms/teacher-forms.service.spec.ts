import { TestBed, inject } from '@angular/core/testing';

import { TeacherFormsService } from './teacher-forms.service';

describe('TeacherFormsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherFormsService]
    });
  });

  it('should be created', inject([TeacherFormsService], (service: TeacherFormsService) => {
    expect(service).toBeTruthy();
  }));
});
