import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftlistComponent } from './draftlist.component';

describe('DraftlistComponent', () => {
  let component: DraftlistComponent;
  let fixture: ComponentFixture<DraftlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
