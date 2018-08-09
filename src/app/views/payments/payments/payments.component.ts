import { PaymentsService } from './../../../services/payments/payments.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentDetails } from '../../../models/payment-details.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments$:Observable<Array<IPaymentDetails>>;
  constructor(private paymentService:PaymentsService) {
    this.payments$ = this.paymentService.getPaymentDetails();
   }

  ngOnInit() {
  }

}
