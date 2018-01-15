import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTeacherScheduleFormComponent } from './check-teacher-schedule-form.component';

describe('CheckTeacherScheduleFormComponent', () => {
  let component: CheckTeacherScheduleFormComponent;
  let fixture: ComponentFixture<CheckTeacherScheduleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTeacherScheduleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTeacherScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
