import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Router } from '@angular/router';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  
  searchTerms= new Subject<string>();
  quiz$!: Observable<Quiz[]>;
  

  constructor(private router: Router,
              private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.quiz$= this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term)=> this.quizService.getQuizByTitleKeyword(term))
    )

  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetails(quiz: Quiz) {
    this.router.navigateByUrl('/admin/quiz/'+quiz.id);
  }


}
