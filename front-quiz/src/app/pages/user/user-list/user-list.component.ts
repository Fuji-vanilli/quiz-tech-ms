import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  users: User[]= [];
  usersSubscriber: User[]= [];
  usersNoSubscriber: User[]= [];

  isFollow: boolean= false;

  profile!: KeycloakProfile;

  constructor(private userService: UserService,
              private keycloakService: KeycloakService ) {}

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
      }
    )
    this.loadUser();
  }

  loadUser() {
    this.userService.fetchAll().subscribe({
      next: response=> {
        this.users= response.data.users
        this.filterUser();
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  subscribe(user: any) {
    this.userService.subscribe(user.email, this.profile.email).subscribe({
      next: response=> {
        window.location.reload();
      }
    })
  }

  unsubscribe(user: any) {
    this.userService.unsubscribe(user.email, this.profile.email).subscribe({
      next: response=> {
        window.location.reload();
      }
    })
  }

  filterUser() {
    this.users.filter(
      user=> {
        if (user.subscribers?.includes(this.profile.email)) {
          this.usersSubscriber.push(user)
        } else {
          this.usersNoSubscriber.push(user)
        }
      }
    )
  }
}
