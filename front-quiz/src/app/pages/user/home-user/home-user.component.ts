import { Component, OnInit } from '@angular/core';
import { HomeQuiz } from '../../models/homeQuiz.model';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Result } from '../../models/result.model';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit{

  color: string= '#c21d03';
  mode: string= 'normal';
  value: number= 37;

  resultQuizzes: Result[]= [];
  resutByQuizId: Result[]= [];
  resutByFrequency: Result[]= [];
  resutByRate: Result[]= [];

  profile!: KeycloakProfile | null;

  menuTypeOpen: boolean= false;
  menuSortOpen: boolean= false;

  homeQuizzes: HomeQuiz[]= [
    {
      title: 'Programming',
      description: 'All about kind of Programming language',
      color: '#6c35de'
    },
    {
      title: 'Network',
      description: 'Technologie of network and his requirements',
      color: '#2E8B57'
    },
    {
      title: 'Blockchain',
      description: 'Technologie of blockchain and crypto and minner',
      color: '#de283b'
    },
    {
      title: 'Cryptography',
      description: 'Security bases fo cryptography and cipher',
      color: '#FF6600'
    }
  ]

  constructor(private resultQuiz: ResultQuizService,
              private keycloakService: KeycloakService,
              private route: Router) {}

  ngOnInit(): void {
    this.loadProfile();   

  }

  loadProfile() {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        this.resultQuiz.fetchByEmailUser(this.profile?.email).subscribe({
          next: response=> {
            this.resultQuizzes= response.data.resultQuizzes     
            this.resultQuizzes.sort((a, b) => {
              const dateA = new Date(a.createdDate);
              const dateB = new Date(b.createdDate);
              return dateB.getTime() - dateA.getTime();
            });
           
            console.log('result quizzes: ', this.resultQuizzes);

          },
          error: err=> {
            console.log(err);
          }
        })
      }
    )
  }

  deleteResult(quizId: any, emailUser: any, frequency: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this Result?',
      icon: 'warning',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel',
      background: '#21262d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resultQuiz.deleteResult(quizId, emailUser, frequency).subscribe({
          next: data=> {
            Swal.fire('Deleted', 'Result Quiz deleted Successfully!', 'success');
            window.location.reload();
          }, 
          error: err=> {
            console.log(err);
            
          }
        })
    }
    });
  }

  filterByQuizId (){
    this.resultQuizzes.filter(
      (result)=> result
    )
  }

  toggleTypeMenu() {
    this.menuTypeOpen= !this.menuTypeOpen;
  }

  toggleSortMenu() {
    this.menuSortOpen= !this.menuSortOpen;
  }

}
