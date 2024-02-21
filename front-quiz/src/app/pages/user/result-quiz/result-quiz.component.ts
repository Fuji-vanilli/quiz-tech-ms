import { Component, OnInit } from '@angular/core';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.scss']
})
export class ResultQuizComponent implements OnInit {

  dataResult: Map<any, string>= new Map();
  quizId!: string;
  quiz!: any;
  answer: string[]= [];
  correctAnswer= 0;
  wrongAnswer= 0;
  noAnswer= 0;
  rateCorrect= 0;
  rateWrong= 0;

  profile!: KeycloakProfile | null;

  constructor(private resultService: ResultQuizService,
              private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.answer= this.resultService.dataResult;
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();    

    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        console.log("profile: ", this.profile);
      }
    )
  }

  chartOptions = {
	  animationEnabled: true,
	  theme: "dark2",
	  exportEnabled: true,
	  title: {
		  text: "Result of Your Quiz"
	  },
	  subtitles: [{
		  text: "Correct answser / wrong answer : QUIZ TECH"
	  }],
	  data: [{
		  type: "doughnut", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "Correct answer", y: 0},
		  	{ name: "Wrong answer", y:  0},
		  	{ name: "No answer", y: 0 },
		  ]
	  }]
	}

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=>{
        this.quiz= response.data.quiz;
        console.table(this.quiz);
        this.getCorrectAnswer();
        console.log('correct:', this.correctAnswer);
        console.log('wrong: ',this.wrongAnswer);
        console.log('len: ', this.answer.length);
        
        this.rateCorrect= (this.correctAnswer*100)/this.quiz.questions.length; 
        this.rateWrong= (this.wrongAnswer*100)/this.quiz.questions.length; 
        
        console.log('rateCorrect: ', this.rateCorrect);
        console.log('rateWrong: ', this.rateWrong);

        this.updateChartData();
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  getCorrectAnswer() {
    for (let i= 0; i< this.quiz.questions.length; i++) {
      if (this.quiz.questions[i].answer=== this.answer[i]) {
        this.correctAnswer++;
      } else if (this.quiz.questions[i].answer!==  this.answer[i]) {
        this.wrongAnswer++;
      } else {
        this.noAnswer++; 
      }
    }
  }

  updateChartData() {
    this.chartOptions.data[0].dataPoints = [
      { name: "Correct answer", y: parseFloat(this.rateCorrect.toFixed(2))},
      { name: "Wrong answer", y: parseFloat(this.rateWrong.toFixed(2))},
      { name: "No answer", y: parseFloat((100- (this.rateCorrect+this.rateWrong)).toFixed(2)) },
    ];

    this.chartOptions.title.text= "Result of Quiz By "+this.profile?.firstName+' '+this.profile?.lastName+' [ '+this.quiz.title+' ]';
  }

}
