import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.scss']
})
export class AddQuizzesComponent implements OnInit{

  quizzes: Quiz[]= [];
  categories: Category[]= [];
  durations: number[]= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  formGroup!: FormGroup;

  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private formBuilder: FormBuilder,
              private route: Router) {}

  ngOnInit(): void {
    this.loadFormGoup();
    this.categoryService.fetchAll(0, 10).subscribe({
    next: response=> {
      console.log(response.data.categories);
      this.categories= response.data.categories;
    }
   })
  }

  loadFormGoup() {
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control(''),
      categoryId: this.formBuilder.control(''),
      duration: this.formBuilder.control(0, Validators.required),
      marks: this.formBuilder.control(0, Validators.required),
      numberOfQuestions: this.formBuilder.control(0, Validators.required),
      active: this.formBuilder.control(false)
    })
  }

  addQuiz() {
    const quiz: Quiz= {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      categoryId: this.formGroup.value.categoryId,
      active: this.formGroup.value.active,
      marks: this.formGroup.value.marks,
      duration: this.formGroup.value.duration,
      numberOfQuestions: this.formGroup.value.numberOfQuestions
    }

    this.quizService.addQuiz(quiz).subscribe({
      next: response=> {

        
        if (response.statusCode== 400) {
          Swal.fire('Error', 'Quiz already exist...Try again!!!', 'error')
          this.route.navigateByUrl('/admin/add-quiz')
        } else {
          Swal.fire('Success', 'new Quiz added successfully!', 'success')
          this.route.navigateByUrl('/admin/quizzes');        
  
          console.log('duration: ',quiz.duration);
          console.log('status', response.statusCode);
        }
      
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
