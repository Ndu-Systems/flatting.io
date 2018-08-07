import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectService {

  url: string = API_URL;
    constructor(private http:HttpClient) { }
    select(table):Observable<any>{
      return this.http.get<any>(`${this.url}/select.php?table=${table}`);
    }

}
