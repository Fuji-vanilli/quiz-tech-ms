import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuestionApiService } from 'src/app/services/question-api.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit{
  selected: string='option2';

  quizId!: string;
  formGroup!: FormGroup;

  constructor(private questionService: QuestionApiService,
              private activeRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    this.formGroup= this.formBuilder.group({
      content: this.formBuilder.control('', Validators.required),
      option1: this.formBuilder.control(''),
      option2: this.formBuilder.control(''),
      option3: this.formBuilder.control(''),
      option4: this.formBuilder.control(''),
      answer: this.formBuilder.control('', Validators.required)
    })
  }
 
  addQuestion() {
 
  }

}
