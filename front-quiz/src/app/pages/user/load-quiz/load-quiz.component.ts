import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { logWarning } from '@ckeditor/ckeditor5-utils';

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
    this.quizService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        this.totalQuizzes= response.data.totalQuizzes;
        console.log(this.quizzes);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
