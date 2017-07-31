import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullDownMenuComponent } from './pull-down-menu.component';

describe('PullDownMenuComponent', () => {
  let component: PullDownMenuComponent;
  let fixture: ComponentFixture<PullDownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullDownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullDownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
