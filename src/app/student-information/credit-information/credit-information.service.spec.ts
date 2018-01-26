import { TestBed, inject } from '@angular/core/testing';

import { CreditInformationService } from './credit-information.service';

describe('CreditInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditInformationService]
    });
  });

  it('should be created', inject([CreditInformationService], (service: CreditInformationService) => {
    expect(service).toBeTruthy();
  }));
});
