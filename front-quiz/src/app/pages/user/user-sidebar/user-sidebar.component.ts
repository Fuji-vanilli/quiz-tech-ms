import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  categories: Category[]= [];
  profile!: KeycloakProfile;
  username!: string;

  user!: User;

  constructor(private keycloakService: KeycloakService,
              private categoryService: CategoryApiService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        const username= profile.username!;
        this.username= username?.charAt(0).toUpperCase()+username.slice(1);

        this.loadUser();
      }
    )
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

  loadUser() {
    this.userService.fetchByEmail(this.profile.email).subscribe({
      next: response=> {
        this.user= response.data.user;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  toQuizByCategory(categoryId: any) {
    this.router.navigateByUrl('/user/quizzes/'+categoryId);
  }

  logout() {
    this.keycloakService.logout(
      window.location.origin
    )
  }
}
