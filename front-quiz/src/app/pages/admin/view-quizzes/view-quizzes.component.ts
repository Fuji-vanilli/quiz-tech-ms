import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { CategoryApiService } from 'src/app/services/category-api.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes: Quiz[]= [];
  
  constructor(private quizService: QuizApiService, private categoryService: CategoryApiService) {}

  ngOnInit(): void {
    this.quizService.fetchAll().subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        console.log(this.quizzes);
      },
      error: err=> {
        console.log(err);
        
      }
     });
  }

}
