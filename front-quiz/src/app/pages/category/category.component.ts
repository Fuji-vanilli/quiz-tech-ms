import { Component, OnInit } from '@angular/core';
import { CategoryApiService } from 'src/app/services/category-api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  categories: any= [];

  constructor(private categoryService: CategoryApiService) {}

  ngOnInit(): void {
    this.categoryService.fetchAll().subscribe({
      next: data=> {
        this.categories= data;
        console.table(data);
      }
    })
  }


}
