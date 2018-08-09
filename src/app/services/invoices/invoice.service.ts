import { Injectable } from '@angular/core';
import { IInvoice } from '../../models';
import { Observable } from 'rxjs';
import { API_URL } from '../../shared/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = API_URL;
  constructor(private httpClient: HttpClient) {}  
 
  updateInvoice(data: Array<IInvoice>) : Observable<any> {
    return this.httpClient.post(`${this.url}/invoice/update-invoices.php`, data);
  }
}
