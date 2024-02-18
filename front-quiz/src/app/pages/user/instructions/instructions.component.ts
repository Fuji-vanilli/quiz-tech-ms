import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit{

  quiz!: Quiz;
  quizId!: string;

  constructor(private quizService: QuizApiService,
              private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz,
        console.log(this.quiz);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
