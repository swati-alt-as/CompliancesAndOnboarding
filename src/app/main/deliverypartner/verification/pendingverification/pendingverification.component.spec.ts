import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingverificationComponent } from './pendingverification.component';

describe('PendingverificationComponent', () => {
  let component: PendingverificationComponent;
  let fixture: ComponentFixture<PendingverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingverificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
