import { Injectable } from '@angular/core';
import { CommonModulesService } from './common-modules.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isUserLoggedIn : boolean = false;

  constructor(private c_service : CommonModulesService, ) {
    if(this.c_service.getData('token'))
		{
		  this.isUserLoggedIn=true;
		}
		else{
		  this.isUserLoggedIn=false;
		}
  }

  // set the login status of user
  setUserLoggedIn()
  {
    this.isUserLoggedIn=true;
  }

  // get the login status of user
  getUserLoggedIn()
  {
    return this.isUserLoggedIn;
  }


}
