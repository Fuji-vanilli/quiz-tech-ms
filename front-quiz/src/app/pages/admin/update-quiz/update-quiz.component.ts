import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit{
  
  inputData: any;
  closedMessage= 'closed using directive'
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateQuizComponent>,
    private formBuilder: FormBuilder,
    private quizService: QuizApiService
  ) {}

  ngOnInit(): void {
    this.inputData= this.data;
  }

  closeUpdate() {
    this.ref.close('closed using function!')
  }

  formGroup= this.formBuilder.group({
    title: this.formBuilder.control(this.data.title),
    description: this.formBuilder.control(this.data.description),
    marks: this.formBuilder.control(this.data.marks),
    numberOfQuestions: this.formBuilder.control(this.data.numberOfQuestions),
    active: this.formBuilder.control(this.data.active),
    categoryId: this.formBuilder.control(this.data.categoryId)
  })
  
  update() {

  }
}
