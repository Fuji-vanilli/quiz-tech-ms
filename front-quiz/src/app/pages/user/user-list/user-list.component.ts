import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{

  users: User[]= [];

  constructor(private userService: UserService ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.fetchAll().subscribe({
      next: response=> {
        this.users= response.data.users
        console.log('users: ', this.users);
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }
}
