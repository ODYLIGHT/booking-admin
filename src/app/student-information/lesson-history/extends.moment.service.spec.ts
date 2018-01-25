import { TestBed, inject } from '@angular/core/testing';

import { Extends.MomentService } from './extends.moment.service';

describe('Extends.MomentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Extends.MomentService]
    });
  });

  it('should be created', inject([Extends.MomentService], (service: Extends.MomentService) => {
    expect(service).toBeTruthy();
  }));
});
