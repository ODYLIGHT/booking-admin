import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeZoneComponent } from './time-zone.component';

describe('TimeZoneComponent', () => {
  let component: TimeZoneComponent;
  let fixture: ComponentFixture<TimeZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
