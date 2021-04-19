import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentShopComponent } from './component-shop.component';

describe('ComponentShopComponent', () => {
  let component: ComponentShopComponent;
  let fixture: ComponentFixture<ComponentShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
