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
  durations: number[]= [0.5,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
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
    imageUrl: this.formBuilder.control(this.data.imageUrl),
    numberOfQuestions: this.formBuilder.control(this.data.numberOfQuestions),
    duration: this.formBuilder.control(this.data.duration),
    active: this.formBuilder.control(this.data.active),
    categoryId: this.formBuilder.control(this.data.categoryId)
  })  
  
  update() {
    const quiz: Quiz= {
      id: this.data.id,
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      marks: this.formGroup.value.marks,
      imageUrl: this.formGroup.value.imageUrl,
      numberOfQuestions: this.formGroup.value.numberOfQuestions,
      categoryId: this.formGroup.value.categoryId,
      duration: this.formGroup.value.duration,
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
