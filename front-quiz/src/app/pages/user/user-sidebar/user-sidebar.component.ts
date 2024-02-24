import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  categories: Category[]= [];

  constructor(private keycloakService: KeycloakService,
              private categoryService: CategoryApiService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        console.table(this.categories)
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  toQuizByCategory(categoryId: any) {
    this.router.navigateByUrl('/user/quizzes/'+categoryId);
  }
}
