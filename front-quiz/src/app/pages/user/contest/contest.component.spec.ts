import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestComponent } from './contest.component';

describe('ContestComponent', () => {
  let component: ContestComponent;
  let fixture: ComponentFixture<ContestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContestComponent]
    });
    fixture = TestBed.createComponent(ContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
