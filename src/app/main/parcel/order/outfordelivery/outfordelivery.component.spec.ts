import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfordeliveryComponent } from './outfordelivery.component';

describe('OutfordeliveryComponent', () => {
  let component: OutfordeliveryComponent;
  let fixture: ComponentFixture<OutfordeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutfordeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfordeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
