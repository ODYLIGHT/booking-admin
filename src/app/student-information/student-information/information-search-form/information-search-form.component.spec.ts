import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSearchFormComponent } from './information-search-form.component';

describe('InformationSearchFormComponent', () => {
  let component: InformationSearchFormComponent;
  let fixture: ComponentFixture<InformationSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
