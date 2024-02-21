import { Component, OnInit } from '@angular/core';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.scss']
})
export class ResultQuizComponent implements OnInit {

  dataResult: Map<any, string>= new Map();
  quizId!: string;
  quiz!: Quiz;
  answer: string[]= [];

  constructor(private resultService: ResultQuizService,
              private activeRoute: ActivatedRoute,
              private quizService: QuizApiService) {}

  ngOnInit(): void {
    this.answer= this.resultService.dataResult;
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();

    console.log(this.answer);
    
  }

  chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  exportEnabled: true,
	  title: {
		  text: "Result of Your Quiz"
	  },
	  subtitles: [{
		  text: "Median hours/week"
	  }],
	  data: [{
		  type: "pie", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "Correct answer", y: 9.1 },
		  	{ name: "Wrong answer", y: 3.7 },
		  	{ name: "No answer", y: 36.4 },
		  ]
	  }]
	}

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=>{
        this.quiz= response.data.quiz;
        console.table(this.quiz);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
