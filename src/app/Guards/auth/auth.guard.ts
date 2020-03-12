import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CommonModulesService } from 'src/app/Services/common-modules.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private common: CommonModulesService, private router : Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.getUserLoggedIn() && (this.common.getData('role') == "User")){
      if(next.data.role == this.common.getData('role') && this.auth.getUserLoggedIn()){
        return true;
      }
      else{
        localStorage.removeItem(btoa("role"));
        localStorage.removeItem(btoa("userInfo"));
        localStorage.removeItem(btoa("token"));
        this.router.navigate(['/']);
        return false;
      }
    }
    else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
