import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit{
  quiz!: any;
  quizId!: string;

  constructor(private routeAcivate: ActivatedRoute,
              private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.quizId= this.routeAcivate.snapshot.params['id'];
    this.loadQuiz();
  }

  loadQuiz() {
    this.quiz= this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz;
        console.table(response.data.quiz);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
