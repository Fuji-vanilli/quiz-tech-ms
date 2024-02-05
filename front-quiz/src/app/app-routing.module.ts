import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { WelcomComponent } from './pages/welcom/welcom.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path:'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  { path:'user/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['USER', 'ADMIN']}},
  { 
    path:'admin', component: DashboardComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']},
    children: [
      { path: '', component: WelcomComponent},
      { path:'profile', component: ProfileComponent }
    ]
  },
  { path:'user/profile', component: ProfileComponent, canActivate: [AuthGuard], data: {role: ['USER', 'ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
