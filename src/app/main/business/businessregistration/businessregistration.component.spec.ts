import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessregistrationComponent } from './businessregistration.component';

describe('BusinessregistrationComponent', () => {
  let component: BusinessregistrationComponent;
  let fixture: ComponentFixture<BusinessregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessregistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
