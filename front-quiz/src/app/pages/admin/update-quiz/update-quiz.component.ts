import { Component, Inject, OnInit, inject } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Quiz } from '../../models/quiz.model';
import Swal from 'sweetalert2';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit{
  
  inputData: any;
  categories: Category[]= [];
  closedMessage= 'closed using directive';
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateQuizComponent>,
    private formBuilder: FormBuilder,
    private quizService: QuizApiService,
    private categoryService: CategoryApiService,
    private route: Router) {}

  ngOnInit(): void {
    this.inputData= this.data;
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        console.log("all categories:");
        console.table(this.categories);
      }
    })
  }

  closeUpdate() {
    this.ref.close('closed using function!')
  }

  formGroup= this.formBuilder.group({
    id: this.formBuilder.control(''),
    title: this.formBuilder.control(this.data.title),
    description: this.formBuilder.control(this.data.description),
    marks: this.formBuilder.control(this.data.marks),
    numberOfQuestions: this.formBuilder.control(this.data.numberOfQuestions),
    active: this.formBuilder.control(this.data.active),
    categoryId: this.formBuilder.control(this.data.categoryId)
  })  
  
  update() {
    const quiz: Quiz= {
      id: this.data.id,
      marks: this.formGroup.value.marks,
      numberOfQuestions: this.formGroup.value.numberOfQuestions,
      categoryId: this.formGroup.value.categoryId,
      active: this.formGroup.value.active
    }

    this.quizService.updateQuiz(quiz).subscribe({
      next: response=> {
        console.table(response.data.quiz);
        Swal.fire('Success', 'Quiz updated successfully', 'success');
        this.route.navigateByUrl('/admin/quizzes');
      }
    })
  }
}
