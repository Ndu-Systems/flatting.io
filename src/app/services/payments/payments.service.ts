import { Injectable } from "@angular/core";
import { API_URL } from "../../shared/config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import {  ISavePayments } from "../../views/payments/uplaod-payment-file/models/Payment";

@Injectable({
  providedIn: "root"
})
export class PaymentsService {
  url = API_URL;
  constructor(private httpClient: HttpClient) {}

  addPayments(data: Array<ISavePayments>): Observable<any> {
    return this.httpClient.post(`${this.url}/payments/add-payments.php`, data);
  }
}
