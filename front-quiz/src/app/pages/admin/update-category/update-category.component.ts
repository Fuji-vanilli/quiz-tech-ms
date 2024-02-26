import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  formGroup!: FormGroup;
  closedMessage: string= 'closed with directive'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ref: MatDialogRef<UpdateCategoryComponent>,
              private categoryService: CategoryApiService,
              private route: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup() {
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control(this.data.title),
      description: this.formBuilder.control(this.data.description),
      icon: this.formBuilder.control(this.data.icon)
    })
  }

  updateCategory() {
    const category: Category= {
      id: this.data.id,
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      icon: this.formGroup.value.icon
    }

    this.categoryService.updateCategory(category).subscribe({
      next: response=> {
        Swal.fire('Updated', 'Category updated successfully!', 'success')
        this.route.navigateByUrl('/admin/categories')
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  closeUpdate() {
    this.ref.close('closed using function!')
  }
}
