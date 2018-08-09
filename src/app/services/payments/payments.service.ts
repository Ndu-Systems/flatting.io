import { IPaymentDetails } from './../../models/payment-details.model';
import { Injectable } from "@angular/core";
import { API_URL } from "../../shared/config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { ISavePayments } from "../../models/Payment";

@Injectable({
  providedIn: "root"
})
export class PaymentsService {
  url = API_URL;
  constructor(private httpClient: HttpClient) {}

  addPayments(data: Array<ISavePayments>): Observable<any> {
    return this.httpClient.post(`${this.url}/payments/add-payments.php`, data);
  }

  getPayment(data:any): Observable<any>{
    return this.httpClient.post(`${this.url}/payments/get-payment.php`, data);
  }
  getPaymentDetails(): Observable<Array<IPaymentDetails>>{
    return this.httpClient.get<Array<IPaymentDetails>>(`${this.url}/payments/get-payment-details.php`);
  }
}
