import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckScheduleSearchFormComponent } from './check-schedule-search-form.component';

describe('CheckScheduleSearchFormComponent', () => {
  let component: CheckScheduleSearchFormComponent;
  let fixture: ComponentFixture<CheckScheduleSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckScheduleSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckScheduleSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
