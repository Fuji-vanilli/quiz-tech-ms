import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';
import { Observable, Subject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit{

  selectImage: any;
  selectedFile!: File;
  filename: string= '';

  quizzes: Quiz[]= [];
  quizzesByTitleKeyword: Quiz[]= [];
  totalQuizzes!: number;

  searchTerm: string= '';
  filterQuizBySearchTerm: Quiz[]= [];

  constructor(private quizService: QuizApiService, 
              private categoryService: CategoryApiService,
              private snackBar: MatSnackBar,
              private route: Router,
              private dialog: MatDialog,
              private keycloakService: KeycloakService) {} 

  ngOnInit(): void {
    this.loadQuizzes();
    console.log('quiz by search: ',this.filterQuizBySearchTerm);
    
  }

  loadQuizzes() {
    this.quizService.fetchAll(0, 10).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        this.totalQuizzes= response.data.totalQuizzes;
        this.filterQuizBySearchTerm= this.quizzes;
        console.log('total elements:', response.data.totalQuizzes);
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
      width: '50%',
      height: '650px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: quiz.id,
        titlePopup: 'Update Quiz',
        title: quiz.title,
        description: quiz.description,
        duration: quiz.duration,
        language: quiz.language,
        imageUrl: quiz.imageUrl,
        marks: quiz.marks,
        numberOfQuestions: quiz.numberOfQuestions,
        active: quiz.active,
        categoryId: quiz.categoryId,
        difficulty: quiz.difficulty
      }
    })

    this.loadQuizzes();
  }

  filterBySearchTerm() {
    this.filterQuizBySearchTerm= this.quizzes.filter(
      quiz=> quiz.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

  
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    const target= event.target as HTMLInputElement;
    if (target.files && target.files.length> 0) {
      this.selectedFile= target.files[0];
      this.filename= this.selectedFile.name;
    }
  }

  uploadProfileImage(quizId: string) {
    this.quizService.updatePhotoQuiz(this.selectedFile, quizId).subscribe({
      next: response=> {
        console.log('updated');
        window.location.reload();
      },
      error: err=> {
        console.log(err);
        
      }
    })

    //window.location.reload();
  }

  uploadFile() {
    document.getElementById('fileInput')?.click();
  }

  showCloseIcon(): boolean {
    return this.searchTerm.length> 0;
  }

  clearSearchTerm() {
    this.searchTerm= '';
  }



}
