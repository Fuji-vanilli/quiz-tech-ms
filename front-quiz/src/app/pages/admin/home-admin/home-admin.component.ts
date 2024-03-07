import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit{

  users: User[]= [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.fetchAll().subscribe({
      next: response=> {
        this.users= response.data.users;
        console.log('users: ',this.users);
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

}
