import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Quiz } from '../../models/quiz.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Question } from '../../models/question.model';
import { QuestionApiService } from 'src/app/services/question-api.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit{
  quizId!: string;
  formGroup!: FormGroup;
  quiz!: Quiz;
  question!: Question;
  options: any= {
    option1: '',
    option2: '',
    option3: '',
    option4: ''

  }

  closedMessage= 'closed using directive';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UpdateQuizComponent>,
    private formBuilder: FormBuilder,
    private quizService: QuizApiService,
    private questionService: QuestionApiService,
    private categoryService: CategoryApiService,
    private route: Router) {}

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      
    })
  }
  
  loadQuestion() {
    this.questionService.getQuestion(this.data.questionId).subscribe({
      next: response=> {
        this.question= response.data.question;
        console.log('question by id: ', this.data.questionId);
        console.table(this.question);        
      },
      error: err=> {
        console.log(err);
      }
    })
  }

  updateQuestion() {

  }

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
  closeUpdate() {
    this.ref.close('closed using function!')
  }

}
