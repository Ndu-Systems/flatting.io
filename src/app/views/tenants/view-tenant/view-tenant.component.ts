import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-tenant',
  templateUrl: './view-tenant.component.html',
  styleUrls: ['./view-tenant.component.scss']
})
export class ViewTenantComponent implements OnInit {

  tenant$ : Observable<any>;
  tenantId : number;
  constructor(
    private selectService : SelectService,  
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.tenantId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.tenant$ = this.selectService.select(`tenant WHERE TenantId = ${this.tenantId}`);
  }
 
  edit(tenant){
    this.router.navigate(['/tenants/edit', tenant.TenantId]);
  }
}
