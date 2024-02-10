import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required)
    });
  }

  addCategory() {
    console.log(this.formGroup.value.title);
  }
}
