import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit{

  quizId!: string;
  quiz!: Quiz;

  constructor(private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    console.log('idquiz: ', this.quizId);
    
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz;
        console.table(this.quiz);
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  deleteQuiz(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.deleteQuiz(id).subscribe({
          next: response=> {
            if (response.statusCode== 200) {
              console.log(response.statusCode);
              
              Swal.fire('Success', 'Quiz deleted successfully', 'success');
            }
            this.loadQuiz();
          },
          error: err=> {
            console.log(err);
          }
        })
    }
    });
  }

  openUpdate(quiz: Quiz) {
    this.dialog.open(UpdateQuizComponent, {
      width: '40%',
      height: '550px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: quiz.id,
        titlePopup: 'Update Quiz',
        title: quiz.title,
        description: quiz.description,
        marks: quiz.marks,
        numberOfQuestions: quiz.numberOfQuestions,
        active: quiz.active,
        categoryId: quiz.categoryId
      }
    })
  }
}
