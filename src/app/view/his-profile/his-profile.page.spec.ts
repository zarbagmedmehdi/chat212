import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HisProfilePage } from './his-profile.page';

describe('HisProfilePage', () => {
  let component: HisProfilePage;
  let fixture: ComponentFixture<HisProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HisProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
