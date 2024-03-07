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

  }

  loginRequired() {
    if (this.keycloakService.isLoggedIn()) {
      this.isConnected= true;
    } else {
      Swal.fire({
        title: "You must connected!",
        text: "To start Explore, You must be identified",
        icon: "info",
        confirmButtonColor: "rgba(0,0,0, 0.5)",
        confirmButtonText: "Login or Register",
        color: '#21262d',
        background: "rgba(255,255,255, 0.5)"
      }).then((result) => {
        if (result.isConfirmed) {
          this.login();
        } 
      });
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
