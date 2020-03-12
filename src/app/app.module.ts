import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { UserManagementComponent } from './Components/user-management/user-management.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './components/user-management/login/login.component';
import { RegisterComponent } from './components/user-management/register/register.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';
import { UserListComponent } from './components/dashboard/user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
