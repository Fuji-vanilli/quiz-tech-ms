import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { WelcomComponent } from './pages/welcom/welcom.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { QuizDetailsComponent } from './pages/admin/quiz-details/quiz-details.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path:'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  { path:'user/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: ['USER']}},
  { 
    path:'admin', component: UserDashboardComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']},
    children: [
      { path: '', component: WelcomComponent },
      { path: 'categories', component:ViewCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quizzes', component: ViewQuizzesComponent },
      { path: 'add-quiz', component: AddQuizzesComponent },
      { path: 'category/:id', component: UpdateCategoryComponent},
      { path: 'quiz/:id', component: QuizDetailsComponent },
      { path: 'questions/:id/:title', component: ViewQuestionsComponent },
      { path: 'add-question/:id', component: AddQuestionComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path:'user/profile', component: ProfileComponent, canActivate: [AuthGuard], data: {role: ['USER', 'ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
