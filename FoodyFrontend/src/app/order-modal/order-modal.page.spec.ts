import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModalPage } from './order-modal.page';

describe('OrderModalPage', () => {
  let component: OrderModalPage;
  let fixture: ComponentFixture<OrderModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
