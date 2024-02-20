import { Component } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.scss']
})
export class StartQuizComponent {
  
  minute: number= 0;
  second: number= 0;
  timer: any;

  spinnerValue: number= 100
  questionValue: number= 0;
  correctAnswer: number= 0;
  duration!: number;
  choiceSelected!: string;

  quiz!: any;
  quizId!: string;
  currentQuestion: number= 0;
  isCurrent: boolean= true;

  resultQuiz: Map<any, string>= new Map();

  constructor(private quizService: QuizApiService,
              private activeRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['quizId'];
    this.loadQuiz();
    this.startTimer();
    this.questionValue= 10;
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz,
        this.duration= this.quiz.duration;
        console.log(this.quiz.questions);
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
    const interval = setInterval(() => {
      this.spinnerValue -= (100 / (this.duration * 60)); 
      if (this.spinnerValue <= 0) {
        clearInterval(interval); 
        this.timeUp();
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
    this.resultQuiz.set(this.quiz.questions[this.currentQuestion], option);

    if (this.quiz.questions[this.currentQuestion].answer=== option) {
      this.correctAnswer++;
    }
  }

  getResult() {
    Swal.fire({
      title: "You are finished the Quiz successfully",
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
        url("../../../../assets/giphy (3).gif")
      `
    }).then((result)=> {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/user/result');
        console.log(this.resultQuiz);
        
      } else {
        this.router.navigateByUrl('/user/quizzes');
      }
    });
  }
}
