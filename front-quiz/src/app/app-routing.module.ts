import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { QuizDetailsComponent } from './pages/admin/quiz-details/quiz-details.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { ViewQuizByCategoryComponent } from './pages/admin/view-quiz-by-category/view-quiz-by-category.component';
import { LoadQuizByCategoryComponent } from './pages/user/load-quiz-by-category/load-quiz-by-category.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { ResultQuizComponent } from './pages/user/result-quiz/result-quiz.component';
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { 
    path:'user', component: UserDashboardComponent, canActivate: [AuthGuard], data: {roles: ['USER', 'ADMIN']},
    children: [
      { path: '', component: LoadQuizComponent },
      { path: 'profile', component: ProfileUserComponent },
      { path: 'quizzes', component: LoadQuizComponent },
      { path: 'quizzes/:categoryId', component: LoadQuizByCategoryComponent },
      { path: 'instructions/:quizId', component: InstructionsComponent },
      { path: 'start/:quizId', component: StartQuizComponent },
      { path: 'result/:quizId', component: ResultQuizComponent }
    ]},
  { 
    path:'admin', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']},
    children: [
      { path: '', component: ViewQuizzesComponent },
      { path: 'categories', component:ViewCategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quizzes', component: ViewQuizzesComponent },
      { path: 'quizzes/:categoryId', component: ViewQuizByCategoryComponent },
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
