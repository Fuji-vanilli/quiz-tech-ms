import { Component } from '@angular/core';
import { Result } from '../../models/result.model';
import { KeycloakProfile } from 'keycloak-js';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  
  color: string= '#c21d03';
  mode: string= 'normal';
  value: number= 37;

  resultQuizzes: Result[]= [];
  resultByQuizTitle: Result[]= [];
  resultByFrequency: Result[]= [];
  resultByRate: Result[]= [];
  resultQuizNoDuplicate: any[]= [];

  numberOfResult: number= 0;

  profile!: KeycloakProfile | null;

  menuTypeOpen: boolean= false;
  menuSortOpen: boolean= false;

  constructor(private resultQuiz: ResultQuizService,
              private keycloakService: KeycloakService,
              private route: Router) {}

  ngOnInit(): void {
    this.loadProfile();   
    this.removeDuplicateResult();
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

            this.numberOfResult= this.resultQuizzes.length;
            this.resultByQuizTitle= this.resultQuizzes;
            this.removeDuplicateResult();
            console.log('result quizzes: ', this.resultQuizzes);

          },
          error: err=> {
            console.log(err);
          }
        })
      }
    )
  }

  loadResultQuizzes() {
    this.resultByQuizTitle= this.resultQuizzes;
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

  removeDuplicateResult() {
    const temp: any= [];
    this.resultQuizzes.forEach(
      (result)=>  {
        temp.push(result.quiz?.title); 
      }
    )

    this.resultQuizNoDuplicate= Array.from(new Set(temp));
  }

  filterByQuizTitle (quizTitle: any){
    this.resultByQuizTitle= this.resultQuizzes.filter(
      (result)=> result.quiz?.title=== quizTitle
    );
  }

  toggleTypeMenu() {
    this.menuTypeOpen= !this.menuTypeOpen;
  }

  toggleSortMenu() {
    this.menuSortOpen= !this.menuSortOpen;
  }
}
