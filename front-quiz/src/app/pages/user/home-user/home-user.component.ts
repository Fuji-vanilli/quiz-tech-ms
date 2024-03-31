import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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

import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent, ChartType } from 'ng-apexcharts';
import { UserService } from 'src/app/services/user.service';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { Category } from '../../models/category.model';

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
  quizzes: Quiz[]= [];
  categories: Category[]= [];

  numberOfResult: number= 0;

  profile!: KeycloakProfile | null;

  menuTypeOpen: boolean= false;
  menuSortOpen: boolean= false;

  homeQuizzes: HomeQuiz[]= [
    {
      title: 'Programming',
      description: 'All about kind of Programming language',
      color: '#6c35de',
      categoryId: '4d89a72c-6c08-4c90-9264-925a54fb5116'
    },
    {
      title: 'Network',
      description: 'Technologie of network and his requirements',
      color: '#2E8B57',
      categoryId: 'c7647ba4-193c-4a47-bc55-5289dbdd1e7a'
    },
    {
      title: 'Blockchain',
      description: 'Technologie of blockchain and crypto and minner',
      color: '#de283b',
      categoryId: '0e7a04f0-a288-442a-bd62-8908aff6da25'
    },
    {
      title: 'Medecine',
      description: 'Sciences of medical',
      color: '#FF6600',
      categoryId: 'd0c6fe15-25cf-4a85-856b-44fdbf7e8122'
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
  resultQuizSummary= new Map<any, any>();

  pageEvent!: PageEvent;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private resultQuiz: ResultQuizService,
              private keycloakService: KeycloakService,
              private userService: UserService,
              private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private route: Router) {
  
                this.chartOptions = {
                  series: [],
                  
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
                    categories: []
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
    this.loadQuiz();
    this.removeDuplicateResult();
    this.loadCategory();
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
        const userData= {
          username: profile.username,
          email: profile.email,
          firstname: profile.firstName,
          lastname: profile.lastName
        }
        this.userService.addUser(userData).subscribe({
          next: response=> {
            console.log("new user added successfully!");
            
          }
        })


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

            this.loadResultSummary(profile.email);

          },
          error: err=> {
            console.log(err);
          }
        })
      }
    )
  }

  loadQuiz() {
    this.quizService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadCategory() {
    this.categoryService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.categories= response.data.categories;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadResultSummary(email: any) {
    this.resultQuiz.getResultSummary(email).subscribe({
      next: response => {
        this.resultQuizSummary = response.data;
        console.log("result summary: ", this.resultQuizSummary);
  
        let series: any[] = [];
        let categories: any[] = [];
  
        for (const [key, value] of Object.entries(this.resultQuizSummary)) {
          series.push({
            name: key,
            data: value
          });
          categories.push(key);
        }
  
        this.chartOptions.series = series;
        if (this.chartOptions && this.chartOptions.xaxis) {
          this.chartOptions.xaxis.categories = categories;
        }
  
        this.chart.updateOptions(this.chartOptions);
  
      },
      error: err => {
        console.log(err);
      }
    });
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

  quizByCategory(categoryId: any): Quiz[] {
    return this.quizzes.filter(quiz=> quiz.categoryId=== categoryId);
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

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!event.target.closest('#select')) {
      this.menuTypeOpen= false;
    }
  }

}
