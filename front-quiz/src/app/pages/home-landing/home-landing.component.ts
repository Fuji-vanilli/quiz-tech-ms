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
 
  constructor(private route: Router,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {

  }

  loginRequired() {
    if (this.keycloakService.isLoggedIn()) {
      this.route.navigateByUrl('/user');
    } else {
      Swal.fire({
        title: "You must connected!",
        text: "To started yo must be identified!",
        icon: "info",
        confirmButtonColor: "#00668c",
        confirmButtonText: "Login or Register",
        background: "#1f2b3e"
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
