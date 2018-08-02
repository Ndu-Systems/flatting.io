import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = API_URL
  constructor(private httpClient: HttpClient) { }

  public loginUser(Email:String,Password:String): Observable<any>{
    return this.httpClient.get<any>(`${this.url}/account/SignIn.php?Email=${Email}&Password=${Password}`);
 }

}
