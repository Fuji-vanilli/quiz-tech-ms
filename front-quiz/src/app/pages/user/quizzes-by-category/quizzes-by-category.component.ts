import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-quizzes-by-category',
  templateUrl: './quizzes-by-category.component.html',
  styleUrls: ['./quizzes-by-category.component.scss']
})
export class QuizzesByCategoryComponent implements OnInit{

  categoryId!: string;
  categoryTitle!: string;

  category!: Category;
  categories: Category[]= [];

  quizzes: Quiz[]= [];
  totalQuizzes: number= 0;

  constructor(private categoryService: CategoryApiService,
              private quizService: QuizApiService,
              private routerActive: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryId= this.routerActive.snapshot.params['categoryId'];
    this.loadCategory();
    this.loadQuizzes();
    this.loadCategories();
  }

  
  loadQuizzes() {
    this.quizService.getQuizByCategory(this.categoryId).subscribe({
      next: response => {
        this.quizzes = response.data.quizzes;
        this.totalQuizzes = response.data.totalQuizzes;

      },
      error: err => {
        console.log(err);
      }
    });
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

  loadCategories() {
    this.categoryService.fetchAll(0, 30).subscribe({
      next: response=> {
        this.categories= response.data.categories;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
