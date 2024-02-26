import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { logWarning } from '@ckeditor/ckeditor5-utils';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent implements OnInit {

  //imageUrl: string= '../../../../assets/core-value.png';

  categoryId!: string;
  quizzes: Quiz[] = [];
  categories: Category[]= [];
  totalQuizzes!: number;
  icon: string= 'bi bi-code-slash';

  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.activeRoute.snapshot.params['categoryId'];
    this.loadQuizzes();
    this.loadCategory();
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

  loadCategory() {
    this.categoryService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        console.log('categories: ',this.categories);
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
