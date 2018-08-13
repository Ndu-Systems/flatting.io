import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IPaymentDetails } from "../../../models";
import { PaymentsService } from "../../../services";
import { SelectService } from "../../../shared/services";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-payment",
  templateUrl: "./view-payment.component.html",
  styleUrls: ["./view-payment.component.scss"]
})
export class ViewPaymentComponent implements OnInit {
  payments$: Observable<Array<any>>;
  paymentId: number;
  search:string;
  msgs:any;
  constructor(private paymentService: PaymentsService,
    private selectService: SelectService,
    private route: ActivatedRoute
  ) {
    this.paymentId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.payments$ = this.selectService.select(`paymentshistory WHERE PaymentId = ${this.paymentId}`);
  }

  ngOnInit() {}
}
