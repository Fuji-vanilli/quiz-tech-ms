import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { User } from '../pages/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar= false;

  profile?: KeycloakProfile | null= null;
  isAdmin: boolean= false;
  openSubMenu= false;

  routeAdmin: boolean= false;
  navBg: any;

  user!: User
  userRoles: string[]= []; 

  constructor(public keycloakService: KeycloakService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private elementRef: ElementRef) {}
  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) { 
      this.keycloakService.loadUserProfile().then(
        profile=> {
          this.profile= profile;
          this.userRoles= this.keycloakService.getUserRoles();
          this.userService.fetchByEmail(profile.email).subscribe({
            next: response=> {
              this.user= response.data.user;
            },
            error: err=> {
              console.log(err);
              
            }
          })
          console.log(profile);
        }
      )
    }
    if (this.keycloakService.getUserRoles().includes('ADMIN')) {
      this.isAdmin= true; 
    }

    this.routeAdmin= this.router.url.includes('admin');
    console.log('url', this.router.url);
    
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
      redirectUri: window.location.origin+'/admin/quizzes'
    });
  }

  logout() {
    event?.preventDefault();
    this.keycloakService.logout(window.location.origin);
  }

  register() {
    this.keycloakService.register({
      redirectUri: window.location.origin+'/user/'
    }).then(()=> {
      const userData= {
        username: this.profile?.username,
        email: this.profile?.email
      }
  
      this.userService.addUser(userData).subscribe({
        next: response=> {
          console.log(response.user);
        },
        error: err=> {
          console.log(err);
          
        }
      })
    })
  }

  toggleMenu() {
    const subMenu= document.getElementById("subMenu");
    if (subMenu) {
      subMenu.classList.toggle("open-menu");
    }
  }

  toggleSubMenu() {
    this.openSubMenu= !this.openSubMenu;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('#subMenu')) {
      this.openSubMenu= false;
    }
  }


  navigateTo(event: any) {
    const route= event.target.value;

    if (route=== 'admin') {
      this.router.navigateByUrl('/admin');
    } else if (route=== 'user') {
      this.router.navigateByUrl('/user');
    }

  }

  toAdmin() {
    this.router.navigateByUrl('/admin');
  }

  toUser() {
    this.router.navigateByUrl('/user');
  }

  @HostListener('document:scroll', [])
  scrollover() {
    const nav = this.elementRef.nativeElement.querySelector('nav');
    if (document.body.scrollTop> 0 || document.documentElement.scrollTop> 0) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  }

/*
  @HostListener('document:scroll') scrollover() {
    console.log(document.body.scrollTop, 'scrolltop#');
    if (document.body.scrollTop> 0 || document.documentElement.scrollTop> 0) {
      this.navBg= {
        'background-image': 'linear-gradient(to bottom, #140537, #13063b, #11083e, #0f0942, #0c0a46)'
      }
    } else {
      this.navBg= {
        'background-color': '#000000'
      }
    }
  } */
}
