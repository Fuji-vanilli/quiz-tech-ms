import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Result } from '../../models/result.model';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit{

  users: User[]= [];
  results: Result[]= [];

  constructor(private userService: UserService,
              private resultService: ResultQuizService) {}

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

  loadResult() {
    this.resultService.fetchAll().subscribe({
      next: response=> {
        this.results= response.data.results;
      }
    })
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fa7970',
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      background: '#21262d'
    }).then((result)=> {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.email).subscribe({
          next: response=> {
            if (response.statusCode== 200) {
              Swal.fire('Deleted', 'User deleted successfully!', 'success');
              this.loadUser()
            }
          },
          error: err=> {
            console.log(err);
            
          }
        })
      }
    })
  }

}
