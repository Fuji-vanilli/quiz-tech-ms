import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{

  formGroup!: FormGroup;
  emailUser!: string;

  selectFile: any;
  selectedFile!: File;
  filename: string= '';

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryApiService,
              private route: Router,
              private snackBar: MatSnackBar,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.emailUser= profile.email!;
      }
    )
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required),
      icon: this.formBuilder.control('')
    });
  }

  handleFileInput(event: any) {
    const target= event.target as HTMLInputElement;
     if (target.files && target.files.length> 0) {
      this.selectFile= target.files[0];
     }
  }

  uplodaImage(categoryId: any) {
    this.categoryService.uploadImage(this.selectFile, categoryId).subscribe({
      next: response=> {
        console.log("uploaded successfully!");
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  addCategory() {
    console.log(this.formGroup.value.title);

    const category: Category= {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      icon: this.formGroup.value.icon,
      createdBy: this.emailUser
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
