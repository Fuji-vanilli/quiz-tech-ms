import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizzesComponent } from './view-quizzes.component';

describe('ViewQuizzesComponent', () => {
  let component: ViewQuizzesComponent;
  let fixture: ComponentFixture<ViewQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuizzesComponent]
    });
    fixture = TestBed.createComponent(ViewQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
