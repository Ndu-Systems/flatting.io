import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  url = API_URL
  constructor(private httpClient: HttpClient) { }
  updateTenant(data): Observable<any> {
    return this.httpClient.post(`${this.url}/tenant/update-tenant.php`, data);
  }

  getPayments(): Observable<any> {
    return this.httpClient.get(`${this.url}/payments/get-payments.php`);
  }

}
