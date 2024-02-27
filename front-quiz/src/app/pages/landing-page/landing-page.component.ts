import { Component, OnInit } from '@angular/core';
import { QuizApiService } from '../../services/quiz-api.service';
import { CategoryApiService } from '../../services/category-api.service';
import { Quiz } from '../models/quiz.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  quizzes: Quiz[]= [];
  categories: Category[]= [];
  
  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService) {}

  ngOnInit(): void {
    this.loadQuizzes();
    this.loadCategory();
  }

  
  loadQuizzes() {
    this.quizService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
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
