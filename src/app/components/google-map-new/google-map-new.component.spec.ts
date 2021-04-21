import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapNewComponent } from './google-map-new.component';

describe('GoogleMapNewComponent', () => {
  let component: GoogleMapNewComponent;
  let fixture: ComponentFixture<GoogleMapNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
