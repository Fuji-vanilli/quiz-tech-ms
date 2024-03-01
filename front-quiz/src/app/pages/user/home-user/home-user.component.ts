import { Component, OnInit } from '@angular/core';
import { HomeQuiz } from '../../models/homeQuiz.model';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit{

  color: string= '#c21d03';
  mode: string= 'normal';
  value: number= 37;

  quizzes: Quiz[]= [];
  quizzesFilter: Quiz[]= [];

  homeQuizzes: HomeQuiz[]= [
    {
      title: 'Programming',
      description: 'All about kind of Programming language',
      color: '#6c35de'
    },
    {
      title: 'Network',
      description: 'Technologie of network and his requirements',
      color: '#2E8B57'
    },
    {
      title: 'Blockchain',
      description: 'Technologie of blockchain and crypto and minner',
      color: '#de283b'
    },
    {
      title: 'Cryptography',
      description: 'Security bases fo cryptography and cipher',
      color: '#FF6600'
    }
  ]

  constructor(private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        this.quizzesFilter= this.quizzes.filter(
          (quiz)=> quiz.status=== true
        );
        console.log(this.quizzes);
        
      },
      error: err=> {
        console.log(err);
      }
    })
  }
}
