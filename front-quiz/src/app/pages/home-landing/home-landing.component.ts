import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { Category } from '../models/category.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { HomeQuiz } from '../models/homeQuiz.model';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
  
  homeQuizzes: HomeQuiz[]= [
    {
      title: 'Programming',
      description: 'All about kind of Programming language',
      color: '#fff'
    },
    {
      title: 'Network',
      description: 'Technologie of network and his requirements',
      color: '#fff'
    },
    {
      title: 'Blockchain',
      description: 'Technologie of blockchain and cryptomoney and minner',
      color: '#fff'
    },
    {
      title: 'Cryptography',
      description: 'Security bases fo cryptography and cipher',
      color: '#fff'
    }
  ]
  
  constructor() {}

  ngOnInit(): void {

  }


}
