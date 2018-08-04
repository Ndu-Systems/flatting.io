import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  loginUser(user: any) {
    if (user.Email !== '') {
      this.loggedIn.next(true);
      this.router.navigate(["/dashboard"]);
    }
  }

  logoutUser() {                            
    this.loggedIn.next(false);
    this.router.navigate(['/accounts/login']);
  }
}
