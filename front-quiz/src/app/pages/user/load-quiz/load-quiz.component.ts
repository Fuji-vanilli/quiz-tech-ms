import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent implements OnInit {

  categoryId!: string;
  quizzes: Quiz[] = [];
  totalQuizzes!: number;

  constructor(private quizService: QuizApiService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.activeRoute.snapshot.params['categoryId'];
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.getQuizByCategory(this.categoryId).subscribe({
      next: response => {
        this.quizzes = response.data.quizzes
        this.totalQuizzes = response.data.totalQuizzes
        console.log("quiz by category: ", this.categoryId);
        console.table(this.quizzes);

      },
      error: err => {
        console.log(err);

      }
    })

  }

}
