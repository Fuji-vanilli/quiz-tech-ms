import { Component, OnInit } from '@angular/core';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { Question } from '../../models/question.model';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.scss']
})
export class ResultQuizComponent implements OnInit {

  dataResult: Map<any, string>= new Map();
  quizId!: string;
  quiz!: Quiz;

  constructor(private resultService: ResultQuizService,
              private activeRoute: ActivatedRoute,
              private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=>{
        this.quiz= response.data.quiz;
        console.table(this.quiz);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
