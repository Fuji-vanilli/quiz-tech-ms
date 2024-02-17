import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  quizId!: string;
  quizTitle!: string;

  questions: Question[]= [];
  isContentExpanded: { [key: number]: boolean } = {};


  constructor(private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private questionService: QuestionApiService,
              private dialog: MatDialog,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    this.quizTitle= this.activeRoute.snapshot.params['title'];

    this.loadQuestionByQuizId();

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
      }
    })
  }

  updateQuestion(question: Question) {
    this.questionService.updateQuestion(question).subscribe({
      next: response=> {
        Swal.fire('Updated', 'Question updated successfully!', 'success');
        console.log('question updated: ', response.data.question);
        this.loadQuestionByQuizId();        
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

  openUpdate(question: Question) {
    this.dialog.open(UpdateQuestionComponent, {
      width: '40%',
      height: '550px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        titlePopup: 'Update Quiz',

      }
    })
  }
}
