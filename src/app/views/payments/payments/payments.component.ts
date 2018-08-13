import { PaymentsService } from '../../../services/payments/payments.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentDetails } from '../../../models/payment-details.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments$:Observable<Array<IPaymentDetails>>;
  search:string;
  msgs:any;
  constructor(private paymentService:PaymentsService,    private route : Router
  ) {
    this.payments$ = this.paymentService.getPaymentDetails();
   }

  ngOnInit() {
  }
  viewPayment(payment:IPaymentDetails){    
    this.route.navigate(['/payments/view', payment.PaymentId]);
  }

}
