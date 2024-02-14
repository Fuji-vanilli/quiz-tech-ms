import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Quiz } from '../../models/quiz.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit{
  quizId!: string;
  formGroup!: FormGroup;
  quiz!: Quiz;
  options: any= {
    option1: '',
    option2: '',
    option3: '',
    option4: ''

  }

  constructor(private ref: MatDialogRef<UpdateQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {

  }

  updateQuestion() {

  }

}
