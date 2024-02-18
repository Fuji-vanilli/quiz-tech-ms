import { Component } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent {

  
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
