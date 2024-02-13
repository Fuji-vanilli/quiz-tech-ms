import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit{

  quizId!: string;
  quizTitle!: string;

  constructor(private activeRoute: ActivatedRoute,
              private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    this.quizTitle= this.activeRoute.snapshot.params['title'];
  }

  

}
