import { Component, OnInit } from '@angular/core';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-result-quiz',
  templateUrl: './result-quiz.component.html',
  styleUrls: ['./result-quiz.component.scss']
})
export class ResultQuizComponent implements OnInit {
  colors: string[]= ['#FF4D4D', '#F18F01', '#2E8B57', '#FF6347', '#71c4ef'];

  selected!: Date;

  quizId!: string;
  quiz!: any;
  answer: string[]= [];
  categories: Category[]= [];
  correctAnswer= 0;
  wrongAnswer= 0;
  noAnswer= 0;
  rateCorrect= 0;
  rateWrong= 0;

  profile!: KeycloakProfile | null;

  constructor(private resultService: ResultQuizService,
              private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private keycloakService: KeycloakService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.answer= this.resultService.dataResult;
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();    
    this.loadCategory();

    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        console.log("profile: ", this.profile);

        const userData= {
          username: profile.username,
          email: profile.email
        }
        this.userService.addUser(userData).subscribe({
          next: response=> {
            console.log("new user added successfully!");
            
          }
        })
      }
    )
  }

  chartOptions = {
	  animationEnabled: true,
	  theme: "light",
	  exportEnabled: true,
	  title: {
		  text: "Result of Your Quiz"
	  },
	  subtitles: [{
		  text: "QUIZ TECH: Correct and wrong answer"
	  }],
	  data: [{
		  type: "pie", //change type to column, line, area, doughnut, pie, etc
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
        
        this.rateCorrect= (this.correctAnswer*100)/this.quiz.questions.length; 
        this.rateWrong= (this.wrongAnswer*100)/this.quiz.questions.length; 

        this.updateChartData();
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadCategory() {
    this.categoryService.fetchAll(0, 30).subscribe({
      next: response=> {
        this.categories= response.data.categories;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  getCorrectAnswer() {
    for (let i= 0; i< this.answer.length; i++) {
      if (this.quiz.questions[i].answer=== this.answer[i]) {
        this.correctAnswer++;
      } else if (this.quiz.questions[i].answer!==  this.answer[i]) {
        this.wrongAnswer++;
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
