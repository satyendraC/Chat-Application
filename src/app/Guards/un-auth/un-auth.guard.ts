import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CommonModulesService } from 'src/app/Services/common-modules.service';


@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(private auth : AuthenticationService, private router : Router, private route: ActivatedRoute, private common : CommonModulesService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.getUserLoggedIn() && (this.common.getData('role') == "User")){
      this.router.navigate(['/dashboard'], {relativeTo: this.route});
    }
    return true;
  }
  
}
