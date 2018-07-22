import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import {Message} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { TenantService } from '../../../services';

@Component({
  selector: 'app-view-tenant',
  templateUrl: './view-tenant.component.html',
  styleUrls: ['./view-tenant.component.scss'],
  providers: [ConfirmationService]

})
export class ViewTenantComponent implements OnInit {

  tenant$ : Observable<any>;
  tenantId : number;
  msgs: Message[] = [];

  constructor(
    private selectService : SelectService,  
    private route: ActivatedRoute,
    private router : Router,
    private tenantService : TenantService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.tenantId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.tenant$ = this.selectService.select(`tenant WHERE TenantId = ${this.tenantId}`);
  }
 
  edit(tenant){
    this.router.navigate(['/tenants/edit', tenant.TenantId]);
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'warn', summary:'Success Message', detail:'Tenant Archived Successfully'});
}
confirm(tenant) {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.update(tenant);
      }
  });
}
  update(tenant) {

    var data = {
      TenantId: tenant.TenantId,
      FirstName: tenant.FirstName,
      Surname: tenant.Surname,
      Email: tenant.Email,
      ContactNumber: tenant.ContactNumber,
      WorkAddress: tenant.WorkAddress,
      WorkTelephone: tenant.WorkTelephone,
      WorkName: tenant.WorkName,
      StatusId:2
    };

  //  alert("You are About To Change Things - Click OK to proceed");
    this.tenantService.updateTenant(data)
        .subscribe(response => {
          if(response == 1){
            this.showSuccess();
            setTimeout(()=>{
           this.router.navigate(['/tenants/tenants']);

            },2000);
          }
          else{
            alert(response);
          }
        })

  }
}
