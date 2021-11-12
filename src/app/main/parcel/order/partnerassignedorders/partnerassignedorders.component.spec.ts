import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerassignedordersComponent } from './partnerassignedorders.component';

describe('PartnerassignedordersComponent', () => {
  let component: PartnerassignedordersComponent;
  let fixture: ComponentFixture<PartnerassignedordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerassignedordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerassignedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
