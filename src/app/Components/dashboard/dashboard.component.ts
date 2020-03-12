import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth : AuthenticationService, private router : Router) { }

  ngOnInit() {
  }

  logout(){
    this.auth.isUserLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/'])

  }

}
