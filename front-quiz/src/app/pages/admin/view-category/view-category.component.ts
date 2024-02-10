import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  categories: any[]= [];

  constructor(private categoryService: CategoryApiService) {}

  ngOnInit(): void {
    this.categoryService.fetchAll().subscribe({
      next: response=> {
        this.categories= response.data.categories;
        console.log(response.data);
      }, 
      error: err=>  {
        console.log(err);
        
      }
    })
  }

}
