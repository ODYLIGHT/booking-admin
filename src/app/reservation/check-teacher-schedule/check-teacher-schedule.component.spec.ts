import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTeacherScheduleComponent } from './check-teacher-schedule.component';

describe('CheckTeacherScheduleComponent', () => {
  let component: CheckTeacherScheduleComponent;
  let fixture: ComponentFixture<CheckTeacherScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTeacherScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTeacherScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
