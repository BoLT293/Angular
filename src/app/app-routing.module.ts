import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register-user',component:RegistrationComponent},
  {path: 'emp-list',component:HomepageComponent, canActivate: [AuthGuard]},
  {path:'add-emp',component:AddemployeeComponent, canActivate: [AuthGuard]},
  {path: 'view-emp/:id', component:ViewComponent, canActivate: [AuthGuard]},
  {path: 'view-emp/:id/:mode', component:ViewComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo:'/login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
