import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeQuiz } from '../../models/homeQuiz.model';
import { Quiz } from '../../models/quiz.model';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Result } from '../../models/result.model';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


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
  resultByQuizTitle: Result[]= [];
  resultQuizNoDuplicate: any[]= [];
  dataResult: any[]= [];

  numberOfResult: number= 0;

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

  length = 0;;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  dataRate: any[]= [];

  pageEvent!: PageEvent;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private resultQuiz: ResultQuizService,
              private keycloakService: KeycloakService,
              private route: Router) {

                const categories: number[]= [];
                let series: any;

                this.resultQuizzes.forEach(
                  result=> {
                    categories.push(result.frequency!);
                    series.push(
                      {
                        name: 'test',
                        data: [12, 25, 85]
                      }
                    )
                  }
                )
    
                this.chartOptions = {
                  series: [
                    {
                      name: 'test',
                      data: [12, 25, 85, 28]
                    }
                  ],
                  chart: {
                    height: 350,
                    type: "area"
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    curve: "smooth"
                  },
                  xaxis: {
                    categories: categories
                  },
                  tooltip: {
                    x: {
                      format: "dd/MM/yy HH:mm"
                    }
                  }
                };
              }

  ngOnInit(): void {
    this.loadProfile();   
    this.removeDuplicateResult();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    const startIndex= this.pageIndex*this.pageSize;
    const endIndex= startIndex+ this.pageSize;

    this.dataResult= this.resultByQuizTitle.slice(startIndex, endIndex);

  }

  loadProfile() {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        this.resultQuiz.fetchByEmailUser(this.profile?.email).subscribe({
          next: response=> {
            this.resultQuizzes= response.data.resultQuizzes 
            
            this.resultQuizzes.forEach(
              (result)=> this.dataRate.push(result.rate)
            );

            this.resultQuizzes.sort((a, b) => {
              const dateA = new Date(a.createdDate);
              const dateB = new Date(b.createdDate);
              return dateB.getTime() - dateA.getTime();
            });

            this.numberOfResult= this.resultQuizzes.length;
            this.resultByQuizTitle= this.resultQuizzes;
            this.removeDuplicateResult();

            this.length= this.resultQuizzes.length;
            this.dataResult= this.resultQuizzes.slice(0, this.pageSize);

          },
          error: err=> {
            console.log(err);
          }
        })
      }
    )
  }

  loadResultQuizzes() {
    this.dataResult= this.resultQuizzes;
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
    this.dataResult= this.resultQuizzes.filter(
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
