import { Component } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { Result } from '../../models/result.model';
import { User } from '../../models/user.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent {
  
  minute: number= 0;
  second: number= 0;
  timer: any;
  interval: any;

  spinnerValue: number= 100
  questionValue: number= 0;
  correctAnswer: number= 0;
  duration!: number;
  choiceSelected!: string;

  quiz!: any;
  quizId!: string;
  currentQuestion: number= 0;
  isCurrent: boolean= true;

  resultQuiz: string[]= [];
  profile!: KeycloakProfile | null;

  constructor(private quizService: QuizApiService,
              private resultService: ResultQuizService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();
    this.startTimer();
    this.playQuiz();

    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
      }
    )
  }

  playQuiz() {
    this.quizService.playQuiz(this.quizId).subscribe({
      next: response=> {
        console.log('active: ', response.data.quiz);
        
      },
      error: err=> {
        console.log(err);
        
      }
    });
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz,
        this.duration= this.quiz.duration;
        console.log(this.quiz.questions);
        this.questionValue= 100/this.quiz.questions.length;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }


  onNextQuestion() {
    if (this.currentQuestion< this.quiz.questions?.length-1) {
      this.currentQuestion++;
      this.questionValue+= 100/this.quiz.numberOfQuestions;
    } else {
      this.isCurrent= false; 
    }
  }

  onPreviousQuestion() {
    if (this.currentQuestion>=1 ) {
      this.currentQuestion--;
      this.questionValue-= 100/this.quiz.numberOfQuestions;
    }
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      this.spinnerValue -= (100 / (this.duration * 60)); 
      if (this.spinnerValue <= 0) {
        clearInterval(this.interval); 
        this.getResult();
      }
    }, 1000); 

    this.timer= setInterval(()=> {
      this.second++;
      if (this.second=== 60) {
        this.second= 0;
        this.minute++;
      }
    }, 1000)
  }

  timeUp() {
    Swal.fire({
      title: 'Time Up',
      text: 'The Time of this Quiz is up',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'SUBMIT',
      cancelButtonText: 'CANCEL'
    }).then((result)=> {
    })
  }
  
  checkResponse(option: string) {
    this.choiceSelected= option;
    this.resultQuiz.push(option);

    if (this.quiz.questions[this.currentQuestion].answer=== option) {
      this.correctAnswer++;
    }

    this.onNextQuestion();
  }

  getResult() {
    const result: Result= {
      rate: ((this.correctAnswer/this.quiz.questions.length)*100).toFixed(2),
      quizId: this.quiz.id,
      emailUser: this.profile?.email,
    }

    this.resultService.addResult(result).subscribe({
      next: response=> {
        console.log(response.data.resultQuiz);
      
      },
      error: err=> {
        console.log(err);
        
      }
    })

    if (this.correctAnswer>= this.quiz.numberOfQuestions/2) {
      Swal.fire({
        title: "You have finished the Quiz successfully",
        width: 600,
        padding: "3em",
        color: "#cee8ff",
        html: `
        <strong>Result</strong>
        <ul class="mt-3" style="list-style: none;">
          <li class="list-item" style="color: #cee8ff;">
            Correct Answer: <strong style="font-size: 24px;">${this.correctAnswer} / ${this.quiz.numberOfQuestions} </strong>
            <span>Questions</span>
          </li>
        </ul>
      `,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: '#00668c',
        confirmButtonText: 'View Details',
        showCancelButton: true,
        cancelButtonColor: '#ff6366',
        cancelButtonText: 'Terminate',
  
        background: "#1f2b3e",
        backdrop: `
        rgba(0,0,123,0.4)
          url("../../../../assets/giphy2.gif")
        `
      }).then((result)=> {
        if (result.isConfirmed) {
          this.resultService.dataResult= this.resultQuiz;
          this.router.navigateByUrl('/user/result/'+this.quizId);
          console.log(this.resultQuiz);
          
        } else {
          this.router.navigateByUrl('/user/quizzes');
        }
      });
    } else  {
      Swal.fire({
        title: "You d'ont have a moyen on this Quiz",
        width: 600,
        padding: "3em",
        color: "#cee8ff",
        html: `
        <strong>Result</strong>
        <ul class="mt-3" style="list-style: none;">
          <li class="list-item" style="color: #cee8ff;">
            Correct Answer: <strong style="font-size: 24px;">${this.correctAnswer} / ${this.quiz.numberOfQuestions} </strong>
            <span>Questions</span>
          </li>
        </ul>
      `,
        icon: 'warning',
        showConfirmButton: true,
        confirmButtonColor: '#00668c',
        confirmButtonText: 'View Details',
        showCancelButton: true,
        cancelButtonColor: '#ff6366',
        cancelButtonText: 'Terminate',
  
        background: "#1f2b3e",
      }).then((result)=> {
        if (result.isConfirmed) {
          this.resultService.dataResult= this.resultQuiz;
          this.router.navigateByUrl('/user/result/'+this.quizId);
          console.log(this.resultQuiz);
          
        } else {
          this.router.navigateByUrl('/user/quizzes');
        }
      });
    }
    clearInterval(this.interval);
    }
}
