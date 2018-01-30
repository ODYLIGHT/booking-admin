import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTeacherScheduleTableComponent } from './check-teacher-schedule-table.component';

describe('CheckTeacherScheduleTableComponent', () => {
  let component: CheckTeacherScheduleTableComponent;
  let fixture: ComponentFixture<CheckTeacherScheduleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTeacherScheduleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTeacherScheduleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
