import { ICounts } from './models/models';
import { AdminDashboardService } from './../../../services';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from '../../../shared/services';
import { ISavePayments } from '../../payments/uplaod-payment-file/models/Payment';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {
  data: any;
  payments:Array<ISavePayments> ;
  counts$:Observable<ICounts[]>;
  constructor(private userDataService : UserDataService,private adminDashboardService: AdminDashboardService) {
 this.counts$ = this.adminDashboardService.getCounts();
this.getPayments();
       
}
  ngOnInit() { 
  }
getPayments(){
    this.adminDashboardService.getPayments().subscribe(res=>{
        this.payments =res;
        let unpaid = this.payments.filter(x=>x.PaymentStatus==='unpaid').length;
        let incomplete = this.payments.filter(x=>x.PaymentStatus==='incomplete').length;
        let paid = this.payments.filter(x=>x.PaymentStatus==='paid').length;
        //get donals
        this.data = {
            labels: ['Un-paid','Paid','incomplete'],
            datasets: [
                {
                    data: [unpaid,paid, incomplete],
                    backgroundColor: [
                        "#ff5252",
                        "#2ecc71",
                        "#f39c12"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#27ae60",
                        "#FFCE56"
                    ]
                }]    
            };
     })
     
}
}
