import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFormsComponent } from './teacher-forms.component';

describe('TeacherFormsComponent', () => {
  let component: TeacherFormsComponent;
  let fixture: ComponentFixture<TeacherFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
