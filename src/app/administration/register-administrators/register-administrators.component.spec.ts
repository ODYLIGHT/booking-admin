import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdministratorsComponent } from './register-administrators.component';

describe('RegisterAdministratorsComponent', () => {
  let component: RegisterAdministratorsComponent;
  let fixture: ComponentFixture<RegisterAdministratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAdministratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAdministratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
