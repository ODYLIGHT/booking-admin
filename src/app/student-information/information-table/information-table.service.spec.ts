import { TestBed, inject } from '@angular/core/testing';

import { InformationTableService } from './information-table.service';

describe('InformationTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformationTableService]
    });
  });

  it('should be created', inject([InformationTableService], (service: InformationTableService) => {
    expect(service).toBeTruthy();
  }));
});
