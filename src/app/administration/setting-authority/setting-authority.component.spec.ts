import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAuthorityComponent } from './setting-authority.component';

describe('SettingAuthorityComponent', () => {
  let component: SettingAuthorityComponent;
  let fixture: ComponentFixture<SettingAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
