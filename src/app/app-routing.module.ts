import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './components/user-management/login/login.component';
import { RegisterComponent } from './components/user-management/register/register.component';
import { UnAuthGuard } from './Guards/un-auth/un-auth.guard';
import { AuthGuard } from './Guards/auth/auth.guard';
import { UserListComponent } from './components/dashboard/user-list/user-list.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';


const routes: Routes = [
  {path: "", redirectTo:"/user-manage", pathMatch:"full" },
  {path: "user-manage", component: UserManagementComponent, canActivate: [UnAuthGuard], children: [
    { path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    {path: '**', component: LoginComponent}
  ]},
  {path: "dashboard", component: DashboardComponent, canActivate:[AuthGuard], data: {role: 'User'}, children: [
    { path: '', component: UserListComponent},
    { path: 'chat/:recieverId/:name', component: ChatComponent},
    {path: '**', component: UserListComponent}
  ]},
  {path: '**', component: UserManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
