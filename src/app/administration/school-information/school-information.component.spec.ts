import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInformationComponent } from './school-information.component';

describe('SchoolInformationComponent', () => {
  let component: SchoolInformationComponent;
  let fixture: ComponentFixture<SchoolInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
