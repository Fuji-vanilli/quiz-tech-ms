import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit{

  username!: string;

  constructor(public keycloakService: KeycloakService) {

  }
  ngAfterViewInit(): void {
    this.loadSidebar();
  }
  ngOnInit(): void {

    this.keycloakService.loadUserProfile().then(
      profile=> {
        const username= profile.username;
        this.username= username?.charAt(0).toUpperCase()+username?.slice(1)!;
      }
    )
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
