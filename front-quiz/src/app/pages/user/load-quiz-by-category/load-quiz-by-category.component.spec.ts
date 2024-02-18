import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizByCategoryComponent } from './load-quiz-by-category.component';

describe('LoadQuizByCategoryComponent', () => {
  let component: LoadQuizByCategoryComponent;
  let fixture: ComponentFixture<LoadQuizByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadQuizByCategoryComponent]
    });
    fixture = TestBed.createComponent(LoadQuizByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
