import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-cateogry-user',
  templateUrl: './cateogry-user.component.html',
  styleUrls: ['./cateogry-user.component.scss']
})
export class CateogryUserComponent  implements OnInit{

  categories: Category[]= [];
  quizzes: Quiz[]= [];
  totalElements: number= 0;

  searchTerm: string= '';
  filterCategoryBySearchTerm: Category[]= [];

  constructor(private categoryService: CategoryApiService,
              private quizService: QuizApiService) {}
  ngOnInit(): void {
    this.loadCategories();
    this.loadQuiz();
  }

  
  loadCategories() {
    this.categoryService.fetchAll(0, 5).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        this.totalElements= response.data.totalElement;
        
        this.filterCategoryBySearchTerm= this.categories;
        
      }, 
      error: err=>  {
        console.log(err);
        
      }
    })
  }

  loadQuiz() {
    this.quizService.fetchAll(0, 30).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  filterBySearchTerm() {
    this.filterCategoryBySearchTerm= this.categories.filter(
      quiz=> quiz.title?.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
    );
  }
}
