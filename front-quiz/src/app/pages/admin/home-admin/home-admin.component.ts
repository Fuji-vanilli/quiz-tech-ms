import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Result } from '../../models/result.model';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import Swal from 'sweetalert2';
import { Category } from '../../models/category.model';
import { Quiz } from '../../models/quiz.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit{
  checked= false;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  currentUser!: User;
  users: User[]= [];
  categories: Category[]= [];
  quizzes: Quiz[]= [];

  results: Result[]= [];
  profile!: KeycloakProfile;

  constructor(private userService: UserService,
              private categoryService: CategoryApiService,
              private quizService: QuizApiService,
              private resultService: ResultQuizService,
              private snackbar: MatSnackBar,
              private keycloakService: KeycloakService) {


                this.chartOptions = {
                  series: [
                    {
                      name: "USERS",
                      data: [44, 55, 41, 67, 22, 13]
                    },
                    {
                      name: "CATEGORIES",
                      data: [13, 23, 20, 8, 13, 11]
                    },
                    {
                      name: "QUIZZES",
                      data: [11, 17, 15, 15, 21, 26]
                    },
                    {
                      name: "CONTEST",
                      data: [0]
                    }
                  ],
                  chart: {
                    type: "bar",
                    height: 350,
                    stacked: true,
                    toolbar: {
                      show: true
                    },
                    zoom: {
                      enabled: true
                    }
                  },
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        legend: {
                          position: "bottom",
                          offsetX: -10,
                          offsetY: 0
                        }
                      }
                    }
                  ],
                  plotOptions: {
                    bar: {
                      horizontal: false
                    }
                  },
                  xaxis: {
                    type: "category",
                    categories: [
                      "01/2024",
                      "02/2024",
                      "03/2024",
                      "04/2024",
                      "05/2024",
                      "06/2024"
                    ]
                  },
                  legend: {
                    position: "right",
                    offsetY: 40
                  },
                  fill: {
                    opacity: 1
                  }
                };
              }

  ngOnInit(): void {
    this.loadUser();
    this.loadCategory();
    this.loadQuizzes();
    this.loadProfile();

  }

  loadProfile() {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        this.loadCurrentUser(profile.email);
      }
    )
  }

  loadCurrentUser(email: any) {
    this.userService.fetchByEmail(email).subscribe({
      next: response=> {
        this.currentUser= response.data.user;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadUser() {
    this.userService.fetchAll().subscribe({
      next: response=> {
        this.users= response.data.users;
        
        this.sortedByRole();
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  sortedByRole() {
    const superAdmin= this.users.filter(user=>  user.roles?.includes('SUPER-ADMIN'));
    const admins = this.users.filter(user => user.roles?.includes('ADMIN'));
    const nonAdmins = this.users.filter(user => !user.roles?.includes('ADMIN'));

    this.users= [... superAdmin.sort((a, b)=>  a.username!.localeCompare(b.username!)), ...admins.sort((a, b)=> a.username!.localeCompare(b.username!)), ...nonAdmins.sort((a, b) => a.username!.localeCompare(b.username!))];
  }

  loadCategory() {
    this.categoryService.fetchAll(0, 30).subscribe({
      next: response=> {
        this.categories= response.data.categories;
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadQuizzes() {
    this.quizService.fetchAll(0, 30).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
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

  addToAdmin(user: User) {
    this.userService.addRole(user.email, 'ADMIN').subscribe({
      next: response=> {
        this.snackbar.open("User change to Admin", "OK");
        window.location.reload();
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  isSuperAdmin(user: any) {
    return user.roles.includes('SUPER-ADMIN');
  }

  isAdmin(user: any) {
    return user.roles.includes('ADMIN');
  }
  
}
