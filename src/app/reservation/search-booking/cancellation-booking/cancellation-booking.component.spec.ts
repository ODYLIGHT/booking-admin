import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationBookingComponent } from './cancellation-booking.component';

describe('CancellationBookingComponent', () => {
  let component: CancellationBookingComponent;
  let fixture: ComponentFixture<CancellationBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
