import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuPage } from './admin-menu.page';

describe('AdminMenuPage', () => {
  let component: AdminMenuPage;
  let fixture: ComponentFixture<AdminMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
