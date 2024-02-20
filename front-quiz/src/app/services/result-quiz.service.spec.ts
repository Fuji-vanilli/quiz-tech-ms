import { TestBed } from '@angular/core/testing';

import { ResultQuizService } from './result-quiz.service';

describe('ResultQuizService', () => {
  let service: ResultQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
