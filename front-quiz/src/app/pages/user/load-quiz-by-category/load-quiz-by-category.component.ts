import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-load-quiz-by-category',
  templateUrl: './load-quiz-by-category.component.html',
  styleUrls: ['./load-quiz-by-category.component.scss']
})
export class LoadQuizByCategoryComponent {

  categoryId!: string;
  quizzes: Quiz[] = [];
  category!: Category;
  totalQuizzes!: number;

  constructor(private quizService: QuizApiService,
              private activeRoute: ActivatedRoute,
              private categoryService: CategoryApiService) { }


  ngOnInit(): void {
    this.categoryId = this.activeRoute.snapshot.params['categoryId'];
    this.loadQuizByCategory();
    this.loadCategory();
  }

  loadQuizByCategory() {
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

  
  loadCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe({
      next: response=> {
        this.category= response.data.category;
        console.table(this.category)
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }
}
