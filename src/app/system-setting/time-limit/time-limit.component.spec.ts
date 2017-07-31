import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitComponent } from './time-limit.component';

describe('TimeLimitComponent', () => {
  let component: TimeLimitComponent;
  let fixture: ComponentFixture<TimeLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
