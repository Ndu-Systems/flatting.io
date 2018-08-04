import { Injectable } from '@angular/core';
import { API_URL } from '../../shared/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ISavePayments } from '../../views/payments/uplaod-payment-file/models/Payment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  url = API_URL
  constructor(private httpClient: HttpClient) { }
  updateTenant(data): Observable<any> {
    return this.httpClient.post(`${this.url}/tenant/update-tenant.php`, data);
  }

  getPayments(): Observable<Array<ISavePayments>> {
    return this.httpClient.get<Array<ISavePayments>>(`${this.url}/payments/get-payments.php`);
  }

  getCounts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/admin/get-counts.php`);
  }

}
