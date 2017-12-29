import { TestBed, inject } from '@angular/core/testing';

import { StudentInformationService } from './student-information.service';

describe('StudentInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentInformationService]
    });
  });

  it('should be created', inject([StudentInformationService], (service: StudentInformationService) => {
    expect(service).toBeTruthy();
  }));
});
