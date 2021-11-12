import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachedpickupComponent } from './reachedpickup.component';

describe('ReachedpickupComponent', () => {
  let component: ReachedpickupComponent;
  let fixture: ComponentFixture<ReachedpickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReachedpickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReachedpickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
