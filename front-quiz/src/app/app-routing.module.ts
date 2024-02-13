import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { WelcomComponent } from './pages/welcom/welcom.component';
import { CategoryComponent } from './pages/category/category.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path:'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  { path:'user/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['USER', 'ADMIN']}},
  { 
    path:'admin', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']},
    children: [
      { path: '', component: WelcomComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'categories', component:ViewCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quizzes', component: ViewQuizzesComponent },
      { path: 'add-quiz', component: AddQuizzesComponent },
      { path: 'category/:id', component: UpdateCategoryComponent},
      { path: 'quiz/:id', component: UpdateQuizComponent },
      { path: 'questions/:id/:title', component: ViewQuestionsComponent },
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
