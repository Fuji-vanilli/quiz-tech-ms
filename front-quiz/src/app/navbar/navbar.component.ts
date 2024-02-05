import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profile?: KeycloakProfile;

  constructor(private keycloakService: KeycloakService) {}
  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(
        profile=> {
          this.profile= profile;
          console.log(profile);
        }
      )
    }
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin+'/admin'
    })
  }

  logout() {
    this.keycloakService.logout(window.location.origin);
  }

  register() {
    this.keycloakService.register({
      redirectUri: window.location.origin
    })
  }
}
