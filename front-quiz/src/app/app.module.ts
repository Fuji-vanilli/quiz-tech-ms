import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgxParticlesModule } from "@tsparticles/angular";
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatNativeDateModule, MatDateFormats } from '@angular/material/core';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuizDetailsComponent } from './pages/admin/quiz-details/quiz-details.component';
import { SearchComponent } from './pages/search/search.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { ViewQuizByCategoryComponent } from './pages/admin/view-quiz-by-category/view-quiz-by-category.component';
import { LoadQuizByCategoryComponent } from './pages/user/load-quiz-by-category/load-quiz-by-category.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { ResultQuizComponent } from './pages/user/result-quiz/result-quiz.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { SearchQuizComponent } from './pages/search-quiz/search-quiz.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { HomeLandingComponent } from './pages/home-landing/home-landing.component';
import { HomeUserComponent } from './pages/user/home-user/home-user.component';
import { HistoryComponent } from './pages/user/history/history.component';
import { MatSortModule } from '@angular/material/sort';
import { CateogryUserComponent } from './pages/user/cateogry-user/cateogry-user.component';
import { ContestComponent } from './pages/user/contest/contest.component';
import { ChallengeComponent } from './pages/user/challenge/challenge.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';



export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'quiz-tech',
        clientId: 'quiz-front'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileComponent,
    SidebarComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    AddQuizzesComponent,
    ViewQuizzesComponent,
    UpdateCategoryComponent,
    UpdateQuizComponent,
    ViewQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    QuizDetailsComponent,
    SearchComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    LoadQuizComponent,
    ViewQuizByCategoryComponent,
    LoadQuizByCategoryComponent,
    InstructionsComponent,
    StartQuizComponent,
    ResultQuizComponent,
    ProfileUserComponent,
    SearchQuizComponent,
    SearchPipePipe,
    HomeLandingComponent,
    HomeUserComponent,
    HistoryComponent,
    CateogryUserComponent,
    ContestComponent,
    ChallengeComponent,
    EditProfileComponent,
    HomeAdminComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTableModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    CanvasJSAngularChartsModule,
    NgxParticlesModule,
    NgxUiLoaderModule,
    NgApexchartsModule,
    PdfViewerModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
