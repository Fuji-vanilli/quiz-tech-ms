import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profile?: KeycloakProfile | null= null;
  isAdmin: boolean= false;

  constructor(public keycloakService: KeycloakService,
              private activateRoute: ActivatedRoute,
              private router: Router) {}
  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(
        profile=> {
          this.profile= profile;
          console.log(profile);
        }
      )
    }
    if (this.keycloakService.getUserRoles().includes('ADMIN')) {
      this.isAdmin= true;
    }
  }

  dashboard() {
    if (this.isAdmin) {
      this.router.navigateByUrl('/admin/')
    } else {
      this.router.navigateByUrl('/user');
    }
  }
  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin+'/admin/'
    });
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully"
    });
  }

  logout() {
    event?.preventDefault();
    this.keycloakService.logout(window.location.origin);
  }

  register() {
    this.keycloakService.register({
      redirectUri: window.location.origin+'/admin/'
    })
  }

  toggleMenu() {
    const subMenu= document.getElementById("subMenu");
    if (subMenu) {
      subMenu.classList.toggle("open-menu");
    }
  }
}
