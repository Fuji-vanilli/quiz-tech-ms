import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes: Quiz[]= [];
  
  constructor(private quizService: QuizApiService, 
              private categoryService: CategoryApiService,
              private snackBar: MatSnackBar,
              private route: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
   this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.fetchAll().subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        console.log(this.quizzes);
      },
      error: err=> {
        console.log(err);
      }
     });
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
            this.loadQuizzes();
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

    this.loadQuizzes();
  }

}