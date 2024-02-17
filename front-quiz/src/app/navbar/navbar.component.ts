import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profile?: KeycloakProfile | null= null;
  roles: string[]= [];

  constructor(public keycloakService: KeycloakService,
              private activateRoute: ActivatedRoute) {}
  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(
        profile=> {
          this.profile= profile;
          console.log(profile);
        }
      )
    }
    this.roles= this.keycloakService.getUserRoles();
    console.log(this.roles)
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin+'/admin'
    })
  }

  logout() {
    event?.preventDefault();
    this.keycloakService.logout(window.location.origin);
  }

  register() {
    this.keycloakService.register({
      redirectUri: window.location.origin+'/admin'
    })
  }

  toggleMenu() {
    const subMenu= document.getElementById("subMenu");
    if (subMenu) {
      subMenu.classList.toggle("open-menu");
    }
  }
}
