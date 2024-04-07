import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { User } from '../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit{

  username!: string;
  userEmail!: any;
  admin!: User;

  constructor(public keycloakService: KeycloakService,
              private userService: UserService) {

  }

  ngAfterViewInit(): void {
    this.loadSidebar();
  }
  ngOnInit(): void {

    this.keycloakService.loadUserProfile().then(
      profile=> {
        const username= profile.username;
        const userEmail= profile.email;
        this.userEmail= profile.email;
        
        this.username= username?.charAt(0).toUpperCase()+username?.slice(1)!;

        this.loadUser(userEmail);
      }
    )
  }

  loadUser(email: any) {
    this.userService.fetchByEmail(email).subscribe({
      next: response=> {
        this.admin= response.data.user;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadSidebar() {
    const humburger= document.querySelector("#toggle-btn");

    humburger?.addEventListener("click", function() {
      document.querySelector("#sidebar")?.classList.toggle("expand")
    });
  }

  logout() {
    this.keycloakService.logout(
      window.location.origin
    )
  }
}
