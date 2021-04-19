import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUserComponent } from './component-user.component';

describe('ComponentUserComponent', () => {
  let component: ComponentUserComponent;
  let fixture: ComponentFixture<ComponentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
