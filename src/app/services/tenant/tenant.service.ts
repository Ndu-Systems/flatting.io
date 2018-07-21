import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class TenantService { 
  url = API_URL
  constructor(private httpClient: HttpClient) { }
  updateTenant(data): Observable<any> {
    return this.httpClient.post(`${this.url}/tenant/update-tenant.php`, data);
  }
}
