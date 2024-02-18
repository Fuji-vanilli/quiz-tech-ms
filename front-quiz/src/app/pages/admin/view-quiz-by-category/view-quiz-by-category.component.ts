import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import Swal from 'sweetalert2';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-view-quiz-by-category',
  templateUrl: './view-quiz-by-category.component.html',
  styleUrls: ['./view-quiz-by-category.component.scss']
})
export class ViewQuizByCategoryComponent {

  quizzes: Quiz[]=  [];
  totalQuizzes!: number;
  categoryId!: string;
  category!: Category;

  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private snackBar: MatSnackBar,
              private route: Router,
              private routeActivate: ActivatedRoute,
              private dialog: MatDialog,
              private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.loadQuizzes();
    this.categoryId= this.routeActivate.snapshot.params['cateogryId'];
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getCategory(this.categoryId).subscribe({
      next: response=> {
        this.category= response.data.category;
        console.table(this.category)
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }
  loadQuizzes() {
    this.quizService.getQuizByCategory(this.categoryId).subscribe({
      next: response => {
        this.quizzes = response.data.quizzes;
        this.totalQuizzes = response.data.totalQuizzes;
        console.log('total elements:', response.data.totalQuizzes);
      },
      error: err => {
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
          next: response => {
            if (response.statusCode == 200) {
              console.log(response.statusCode);

              Swal.fire('Success', 'Quiz deleted successfully', 'success');
            }
            this.loadQuizzes();
          },
          error: err => {
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
