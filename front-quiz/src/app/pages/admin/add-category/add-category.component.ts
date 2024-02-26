import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryApiService,
              private route: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required),
      icon: this.formBuilder.control('')
    });
  }

  addCategory() {
    console.log(this.formGroup.value.title);

    const category: Category= {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      icon: this.formGroup.value.icon
    }
    
    this.categoryService.addCategory(category).subscribe({
      next: response=> {
        console.log(response.data.category);
        Swal.fire('Success', 'new Category added successfully!', 'success')
        this.route.navigateByUrl('admin/categories');
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }
}
