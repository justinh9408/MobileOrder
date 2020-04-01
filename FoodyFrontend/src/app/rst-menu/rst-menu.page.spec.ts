import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RstMenuPage } from './rst-menu.page';

describe('RstMenuPage', () => {
  let component: RstMenuPage;
  let fixture: ComponentFixture<RstMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RstMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RstMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
