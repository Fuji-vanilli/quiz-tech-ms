import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionApiService } from 'src/app/services/question-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Question } from '../../models/question.module';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit{
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  quizId: string= 'a4af5f43-9a06-47e6-aa4b-15204408bf64';
  quizTitle!: string;

  questions: Question[]= [];

  constructor(private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private questionService: QuestionApiService) {}

  ngOnInit(): void {
    //this.quizId= this.activeRoute.snapshot.params['id'];
    this.quizTitle= this.activeRoute.snapshot.params['title'];

    this.loadQuestionByQuizId();
  }

  loadQuestionByQuizId() {
    this.questionService.fetchAll(0, 10, this.quizId).subscribe({
      next: response=> {
        this.questions= response.data.questions,
        console.table(this.questions);
      }
    })
  }

}
