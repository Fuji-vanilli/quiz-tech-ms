import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile?: KeycloakProfile;

  constructor(private kcService: KeycloakService) {}

  ngOnInit(): void {
    if (this.kcService.isLoggedIn()) {
      this.kcService.loadUserProfile().then(
        profile=> {
          this.profile= profile;
        }
      )
    }
  }

}
