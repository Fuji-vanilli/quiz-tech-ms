import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Quiz } from '../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-search-quiz',
  templateUrl: './search-quiz.component.html',
  styleUrls: ['./search-quiz.component.scss']
})
export class SearchQuizComponent implements OnInit{

  quizzes: Quiz[]= [];
  searchTerm: string= '';
  filterQuizzesBySearchTerm: Quiz[]= [];

  constructor(private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.loadQuizzes();
    console.log('filter: ', this.filterQuizzesBySearchTerm);
    
  }

  loadQuizzes() {
    this.quizService.fetchAll(0, 30).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        this.filterQuizzesBySearchTerm= this.quizzes;
      },
      error: err=> {
        console.log(err);
      }
    })
  }

  filterBySearchTerm() {
    this.filterQuizzesBySearchTerm= this.quizzes.filter(
      quiz=> quiz.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
