import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedupComponent } from './pickedup.component';

describe('PickedupComponent', () => {
  let component: PickedupComponent;
  let fixture: ComponentFixture<PickedupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickedupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
