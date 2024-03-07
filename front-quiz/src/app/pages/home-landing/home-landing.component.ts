import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home-landing',
  templateUrl: './home-landing.component.html',
  styleUrls: ['./home-landing.component.scss']
})
export class HomeLandingComponent implements OnInit {
 
  isConnected: boolean= false;

  constructor(private route: Router,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.isConnected= true;
    }
  }

  login() {
    this.keycloakService.login({
      redirectUri: window.location.origin+'/user'
    });
  }

  register() {
    this.keycloakService.register({
      redirectUri: window.location.origin+'/user'
    });
  }


  

}
