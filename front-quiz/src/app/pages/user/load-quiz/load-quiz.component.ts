import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent implements OnInit {

  quizzes: Quiz[]= [];
  totalQuizzes!: number;

  constructor(private quizService: QuizApiService) {}

  ngOnInit(): void {
   this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        this.totalQuizzes= response.data.totalQuizzes;
        console.table(this.quizzes)
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
