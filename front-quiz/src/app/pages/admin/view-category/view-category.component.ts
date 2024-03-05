import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

declare var window: any;

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  categories: Category[]= [];
  categoryId!: string;
  totalElements!: number

  constructor(private categoryService: CategoryApiService, 
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
}
