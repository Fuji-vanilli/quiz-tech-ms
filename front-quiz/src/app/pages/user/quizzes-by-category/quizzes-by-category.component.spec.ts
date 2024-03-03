import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesByCategoryComponent } from './quizzes-by-category.component';

describe('QuizzesByCategoryComponent', () => {
  let component: QuizzesByCategoryComponent;
  let fixture: ComponentFixture<QuizzesByCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizzesByCategoryComponent]
    });
    fixture = TestBed.createComponent(QuizzesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
