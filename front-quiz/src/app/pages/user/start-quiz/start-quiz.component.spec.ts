import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuizComponent } from './start-quiz.component';

describe('StartQuizComponent', () => {
  let component: StartQuizComponent;
  let fixture: ComponentFixture<StartQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartQuizComponent]
    });
    fixture = TestBed.createComponent(StartQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
