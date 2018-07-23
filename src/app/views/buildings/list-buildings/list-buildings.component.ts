import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectService } from '../../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.scss']
})
export class ListBuildingsComponent implements OnInit {

  buildings$ : Observable<any>;

  constructor(
    private selectService : SelectService,    
    private route : Router
  ) { }

  ngOnInit() {
    this.buildings$ =  this.selectService.select("buildings WHERE StatusId = 1  order by BuildingId DESC");
  }

}
