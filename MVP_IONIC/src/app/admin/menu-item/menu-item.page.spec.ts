import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemPage } from './menu-item.page';

describe('MenuItemPage', () => {
  let component: MenuItemPage;
  let fixture: ComponentFixture<MenuItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
