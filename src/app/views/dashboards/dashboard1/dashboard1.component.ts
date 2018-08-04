import { AdminDashboardService } from './../../../services';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataService } from '../../../shared/services';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit {
  data: any;  
  constructor(private userDataService : UserDataService,private adminDashboardService: AdminDashboardService) {
    this.data = {
        labels: ['Paid','Un-paid','Partial'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]    
        };

        this.adminDashboardService.getPayments().subscribe(res=>{
            res;
        })
        
}
  ngOnInit() { 
  }

}
