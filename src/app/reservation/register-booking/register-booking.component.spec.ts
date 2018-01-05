import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBookingComponent } from './register-booking.component';

describe('RegisterBookingComponent', () => {
  let component: RegisterBookingComponent;
  let fixture: ComponentFixture<RegisterBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
