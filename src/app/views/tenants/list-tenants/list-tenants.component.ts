import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../../shared/services';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-list-tenants',
  templateUrl: './list-tenants.component.html',
  styleUrls: ['./list-tenants.component.scss']
})
export class ListTenantsComponent implements OnInit {
 tenants$ : Observable<any>;
  constructor(
    private selectService : SelectService,    
    private route : Router
  ) { }

  ngOnInit() {
    this.tenants$ = this.selectService.select("tenant WHERE StatusId = 1  order by TenantId DESC");
  }
  
  viewTenant(tenant){    
    this.route.navigate(['/tenants/view', tenant.TenantId]);
  }
}
