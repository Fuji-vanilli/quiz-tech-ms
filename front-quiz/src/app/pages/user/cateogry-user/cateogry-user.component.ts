import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-cateogry-user',
  templateUrl: './cateogry-user.component.html',
  styleUrls: ['./cateogry-user.component.scss']
})
export class CateogryUserComponent  implements OnInit{

  categories: Category[]= [];
  totalElements: number= 0;

  constructor(private categoryService: CategoryApiService) {}
  ngOnInit(): void {
    this.loadCategories();
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

}
