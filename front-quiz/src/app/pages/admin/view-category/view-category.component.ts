import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  categories: Category[]= [];
  categoryId!: string;


  constructor(private categoryService: CategoryApiService, 
              private routeActive: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadCategories();
    this.categoryId= this.routeActive.snapshot.params['id'];
  }


  loadCategories() {
    this.categoryService.fetchAll(0, 5).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        console.log(response.data);
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
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#dc2626'
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
}
