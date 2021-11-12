import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutforpickupComponent } from './outforpickup.component';

describe('OutforpickupComponent', () => {
  let component: OutforpickupComponent;
  let fixture: ComponentFixture<OutforpickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutforpickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutforpickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
