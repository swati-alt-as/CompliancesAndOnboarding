import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReacheddeliveryComponent } from './reacheddelivery.component';

describe('ReacheddeliveryComponent', () => {
  let component: ReacheddeliveryComponent;
  let fixture: ComponentFixture<ReacheddeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReacheddeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReacheddeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
