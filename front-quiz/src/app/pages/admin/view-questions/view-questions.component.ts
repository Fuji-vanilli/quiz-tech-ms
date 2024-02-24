import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionApiService } from 'src/app/services/question-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Question } from '../../models/question.model';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateQuestionComponent } from '../update-question/update-question.component';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit{
  quizId!: string;
  quizTitle!: string;
  quiz!: any;

  questions: Question[]= [];
  isContentExpanded: { [key: number]: boolean } = {};


  constructor(private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private questionService: QuestionApiService,
              private dialog: MatDialog,
              private route: Router) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    this.quizTitle= this.activeRoute.snapshot.params['title'];

    this.loadQuestionByQuizId();
    this.loadQuiz();

  }

  toggleExpand(index: number) {
    this.isContentExpanded[index] = !this.isContentExpanded[index];
    console.log('expanded'+this.isContentExpanded);
    
  }

  loadQuestionByQuizId() {
    this.questionService.fetchAll(0, 10, this.quizId).subscribe({
      next: response=> {
        this.questions= response.data.questions,
        console.table(this.questions);
      },
      error: err=> {
        console.log(err);
      }
    })
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  deleteQuestion(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this Question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then((result)=> {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(id).subscribe({
          next: response=> {
            if (response.statusCode== 200) {
              Swal.fire('Deleted', 'Question deleted successfully!', 'success');
              this.loadQuestionByQuizId();
            }
          },
          error: err=> {
            console.log(err);
            
          }
        })
      }
    })

  }

  openUpdate(question: any) {
    this.dialog.open(UpdateQuestionComponent, {
      width: '40%',
      height: '550px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        titlePopup: 'Update Quiz',
        quiz: this.quiz,
        questionId: question.id,
        content: question.content,
        option1: question.options[0],
        option2: question.options[1],
        option3: question.options[2],
        option4: question.options[3],
        answer: question.answer
      }
    })

    this.loadQuestionByQuizId();
  }
}
