import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuestionComponent } from './update-question.component';

describe('UpdateQuestionComponent', () => {
  let component: UpdateQuestionComponent;
  let fixture: ComponentFixture<UpdateQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateQuestionComponent]
    });
    fixture = TestBed.createComponent(UpdateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
