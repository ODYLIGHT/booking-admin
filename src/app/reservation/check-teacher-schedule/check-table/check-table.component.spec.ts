import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTableComponent } from './check-table.component';

describe('CheckTableComponent', () => {
  let component: CheckTableComponent;
  let fixture: ComponentFixture<CheckTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
