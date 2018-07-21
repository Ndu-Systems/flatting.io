import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TenantService } from '../../../services';

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.scss']
})
export class EditTenantComponent implements OnInit {
  cardForm: FormGroup;
  tenant$: Observable<any>;
  tenantId: number;
  constructor(
    private selectService: SelectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tenantService : TenantService,
    private router : Router
  ) {
    this.cardForm = fb.group({
      validateName: ['', Validators.required],
      validateSurname: ['', Validators.required],
      validateEmail: ['', [Validators.email, Validators.required]],
      validatePhoneNumber: ['', Validators.required],
      validateWorkNumber: ['', Validators.required],
      validateWorkName: ['', Validators.required],
      validateWorkAddress: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.tenantId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.tenant$ = this.selectService.select(`tenant WHERE TenantId = ${this.tenantId}`);
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
      WorkName: tenant.WorkName
    };

    alert("You are About To Change Things - Click OK to proceed");
    this.tenantService.updateTenant(data)
        .subscribe(response => {
          if(response == 1){
            alert("Tenant Updated");
            this.router.navigate(['/tenants/view', tenant.TenantId]);
          }
          else{
            alert(response);
          }
        })

  }

}
