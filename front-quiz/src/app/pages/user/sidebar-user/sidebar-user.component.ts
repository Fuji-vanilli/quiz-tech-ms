import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss']
})
export class SidebarUserComponent implements OnInit, AfterViewInit{
  showSubmenu= false;

  profile!: KeycloakProfile;
  username!: string;

  user!: User;

  constructor(private keycloakService: KeycloakService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        const username= profile.username!;
        this.username= username?.charAt(0).toUpperCase()+username.slice(1);

        this.loadUser();
      }
    )
  }

  
  ngAfterViewInit(): void {
    this.loadSidebar();
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

  loadSidebar() {
    const humburger= document.querySelector("#toggle-btn");

    humburger?.addEventListener("click", function() {
      document.querySelector("#sidebar")?.classList.toggle("expand")
    });
  }
}
