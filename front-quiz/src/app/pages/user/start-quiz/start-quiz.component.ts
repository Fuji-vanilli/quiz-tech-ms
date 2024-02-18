import { Component } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent {

  
  quiz!: any;
  quizId!: string;
  currentQuestion: number= 0;

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
        console.log(this.quiz.questions);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  onNextQuestion() {
    if (this.currentQuestion< this.quiz.questions?.length-1) {
      this.currentQuestion++;
    }
  }

  onPreviousQuestion() {
    if (this.currentQuestion>=1 ) {
      this.currentQuestion--;
    }
  }


}
