import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionApiService } from 'src/app/services/question-api.service';
import { Question } from '../../models/question.model';
import Swal from 'sweetalert2';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit{

  public Editor= ClassicEditor;

  quizId!: string;
  formGroup!: FormGroup;
  quiz!: Quiz;
  options: any= {
    option1: '',
    option2: '',
    option3: '',
    option4: ''

  }

  constructor(private questionService: QuestionApiService,
              private quizService: QuizApiService,
              private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private route: Router) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    this.loadFormGroup();
    this.loadQuiz();
  }

  loadFormGroup() {
    this.formGroup= this.formBuilder.group({
      content: this.formBuilder.control('', Validators.required),
      option1: this.formBuilder.control('', Validators.required),
      option2: this.formBuilder.control(''),
      option3: this.formBuilder.control(''),
      option4: this.formBuilder.control(''),
      answer: this.formBuilder.control('', Validators.required)
    })
  }

  loadQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe({
      next: response=> {
        this.quiz= response.data.quiz;
        console.log('quie: ', this.quiz);
        
      }
    })
  }

  addQuestion() {
    const options: string[]= [
      this.formGroup.value.option1,
      this.formGroup.value.option2,
      this.formGroup.value.option3,
      this.formGroup.value.option4
    ]
    const question: Question= {
      content: this.formGroup.value.content,
      options: options,
      answer: this.formGroup.value.answer,
      quizId: this.quizId
    };

    this.questionService.addQuestion(question).subscribe({
      next: response=> {
        Swal.fire('Success', 'Question added successfully!', 'success');
        this.route.navigateByUrl('/admin/questions/'+this.quizId+'/'+this.quiz.title);
      }
    })
  }

}
