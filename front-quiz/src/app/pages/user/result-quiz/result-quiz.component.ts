import { Component, OnInit } from '@angular/core';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.scss']
})
export class ResultQuizComponent implements OnInit {

  dataResult: Map<any, string>= new Map();
  questions: Question[]= [];

  constructor(private resultService: ResultQuizService) {}

  ngOnInit(): void {
    this.dataResult= this.resultService.dataResult;
    this.questions= Array.from(this.dataResult.keys());
  }


}
