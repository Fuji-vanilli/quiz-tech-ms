import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionsComponent } from './view-questions.component';

describe('ViewQuestionsComponent', () => {
  let component: ViewQuestionsComponent;
  let fixture: ComponentFixture<ViewQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuestionsComponent]
    });
    fixture = TestBed.createComponent(ViewQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
