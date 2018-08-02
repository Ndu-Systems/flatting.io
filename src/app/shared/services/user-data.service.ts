import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user: any
  constructor() { }
  saveUser(user: any): Observable<any> {
    return this.user = user;
  }
  getUser(): any {
    return this.user;
  }
}
