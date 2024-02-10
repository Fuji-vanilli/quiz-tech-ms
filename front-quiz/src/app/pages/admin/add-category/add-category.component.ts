import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryApiService,
              private route: Router) {}

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required)
    });
  }

  addCategory() {
    console.log(this.formGroup.value.title);

    const category: Category= {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description
    }
    this.categoryService.addCategory(category).subscribe({
      next: response=> {
        console.log(response.data.category);
        this.route.navigateByUrl('admin/categories');
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }
}
