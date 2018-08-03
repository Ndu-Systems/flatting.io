 
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { map, take } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    constructor(     
        private router: Router,
        private authenticationService : AuthenticationService
      ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>{
        return this.authenticationService.isLoggedIn         
        .pipe(
          take(1),                              
          map((isLoggedIn: boolean) => {          
            if (!isLoggedIn){
              this.router.navigate(['/accounts/login']);  
              return false;
            }
            return true;
          }));       
    }
}
