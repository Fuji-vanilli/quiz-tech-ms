import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { UserService } from 'src/app/services/user.service';

declare var window: any;

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  colors: string[]= ['#FF4D4D', '#F18F01', '#2E8B57', '#FF6347', '#71c4ef'];

  
  selectImage: any;
  selectedFile!: File;
  filename: string= '';
  currentCategoryId!: string;

  categories: Category[]= [];
  categoriesBySearchTerm: Category[]= [];
  categoryId!: string;
  totalElements!: number

  searchTerm: string= '';

  constructor(private categoryService: CategoryApiService, 
              private userService: UserService,
              private routeActive: ActivatedRoute,
              private dialog: MatDialog,
              public keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.categoryId= this.routeActive.snapshot.params['id'];
  }


  loadCategories() {
    this.categoryService.fetchAll(0, 5).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        this.totalElements= response.data.totalElement;
        console.log(response.data);
        console.log('total elements: ', this.totalElements);
        
      }, 
      error: err=>  {
        console.log(err);
        
      }
    })
  }

  deleteCategory(id: any) {
    Swal.fire({
      title: 'Are you sure!?',
      text: 'Are you sure to delete this cateogry!?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: 'rgba(0, 0, 0, 0.3)',
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#bb2649',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fff'
    }).then(result=> {
       if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: response=> {
            if (response.statusCode== 200) {
              Swal.fire('Success', 'category deleted successfully!', 'success');
              this.loadCategories();
              console.log("status", response.statusCode);
            }
          },
          error: err=> {
            console.log(err);
          }
        })
       }
    })
  }

  openUpdate(category: Category) {
    this.dialog.open(UpdateCategoryComponent, {
      width: '45%',
      height: '650px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        id: category.id,
        title: category.title,
        description: category.description,
        icon: category.icon
      }
    })
  } 

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    const target= event.target as HTMLInputElement;
    if (target.files && target.files.length> 0) {
      this.selectedFile= target.files[0];
      this.filename= this.selectedFile.name;
    }
  }

  uploadImage() {
    this.categoryService.uploadImage(this.selectedFile, this.currentCategoryId).subscribe({
      next: response=> {
        console.log('uploaded');
        window.location.reload();
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  uploadFile() {
    document.getElementById('fileInput')?.click();
  }

  updateCategoryId(category: Category) {
    this.currentCategoryId= category.id!;
    console.log('category id: '+category.id);
    
  }

  userByEmail(email: any) {
    let user;

    this.userService.fetchByEmail(email).subscribe({
      next: response=> {
        user= response.data.user;
      },
      error: err=> {
        console.log(err);
        
      }
    })

    return user;
  } 

  filterBySearchTerm() {
    this.categoriesBySearchTerm= this.categories.filter(category=> category.title.includes(this.searchTerm));
  }

  activeCancel() {
    return this.searchTerm!== '';
  }

  clearSearchTerm() {
    this.searchTerm= '';
  }
}
