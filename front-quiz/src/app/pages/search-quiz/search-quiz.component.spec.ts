import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuizComponent } from './search-quiz.component';

describe('SearchQuizComponent', () => {
  let component: SearchQuizComponent;
  let fixture: ComponentFixture<SearchQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchQuizComponent]
    });
    fixture = TestBed.createComponent(SearchQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
