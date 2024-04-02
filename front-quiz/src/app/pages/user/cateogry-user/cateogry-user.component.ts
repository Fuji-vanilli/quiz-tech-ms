import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-cateogry-user',
  templateUrl: './cateogry-user.component.html',
  styleUrls: ['./cateogry-user.component.scss']
})
export class CateogryUserComponent  implements OnInit{
  colors: string[]= ['#FF4D4D', '#F18F01', '#2E8B57', '#FF6347', '#71c4ef'];

  categories: Category[]= [];
  quizzes: Quiz[]= [];
  totalElements: number= 0;

  searchTerm: string= '';
  filterCategoryBySearchTerm: Category[]= [];

  constructor(private categoryService: CategoryApiService,
              private quizService: QuizApiService,
              private userService: UserService) {}
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

  userByEmail(email: any): User {
    let user!: User;

    this.userService.fetchByEmail(email).subscribe({
      next: response=> {
        user= response.data.user;
      },
      error: err=> {
        console.log(err);
        
      }
    })

    return user;
  }

  quizByCategory(categoryId: any): Quiz[] {
    return this.quizzes.filter(quiz=>  quiz.categoryId== categoryId);
  }

  filterBySearchTerm() {
    this.filterCategoryBySearchTerm= this.categories.filter(
      category=> category.title?.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase())
    );
  }

  activeCancel(): boolean {
    return this.searchTerm.length> 0;
  }

  clearSearchTerm() {
    this.searchTerm= '';
  }
}
