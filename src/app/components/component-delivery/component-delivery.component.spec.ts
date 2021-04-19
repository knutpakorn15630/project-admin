import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDeliveryComponent } from './component-delivery.component';

describe('ComponentDeliveryComponent', () => {
  let component: ComponentDeliveryComponent;
  let fixture: ComponentFixture<ComponentDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
