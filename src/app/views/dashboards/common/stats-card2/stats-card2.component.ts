import { Component, OnInit, Input } from '@angular/core';
import { ISavePayments } from '../../../../models/Payment';

@Component({
  selector: 'app-stats-card2',
  templateUrl: './stats-card2.component.html',
  styleUrls: ['./stats-card2.component.scss']
})
export class StatsCard2Component implements OnInit {
  @Input() payments: Array<ISavePayments>;
  incomplete:number=0;
  constructor() {
  
   }

  ngOnInit() {
  }

}
