import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexStroke, ApexTooltip, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { ResultQuizService } from 'src/app/services/result-quiz.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit{
  
  profile!: KeycloakProfile;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  resultQuizSummary= new Map<any, any>();

  dataResult: any[]= [];

  constructor(private keycloakService: KeycloakService,
              private resultQuiz: ResultQuizService,
              private dialog: MatDialog) {
    this.chartOptions = {
      series: [],
      
      chart: {
        height: 350,
        type: "bar"
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
  }

  loadProfile() {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile
        this.loadResultSummary(profile.email);
      }
    )
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

          this.dataResult.push({
            quizTitle: key,
            frequency: value.length,
            maxScore: Math.max(...value)
          })
        }
  
        this.chartOptions.series = series;
        if (this.chartOptions && this.chartOptions.xaxis) {
          this.chartOptions.xaxis.categories = categories;
        }
  
        this.chart.updateOptions(this.chartOptions);

        console.log("dataresult: ", this.dataResult);
        

      },
      error: err => {
        console.log(err);
      }
    });
  }

  openUpdate() {
    this.dialog.open(EditProfileComponent, {
      width: '50%',
      height: '650px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        
      }
    })
  }
  
}
