import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.scss']
})
export class AddQuizzesComponent implements OnInit{

  quizzes: Quiz[]= [];
  categories: Category[]= [];

  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService) {}

  ngOnInit(): void {
   this.categoryService.fetchAll().subscribe({
    next: response=> {
      console.log(response.data.categories);
      this.categories= response.data.categories;
    }
   })
  }


}
