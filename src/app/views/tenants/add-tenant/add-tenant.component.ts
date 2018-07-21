import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TenantService } from '../../../services';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss']
})
export class AddTenantComponent implements OnInit {
  cardForm: FormGroup;
  FirstName: string;
  Surname: string;
  Email: string;
  ContactNumber: string;
  NOKName: string;
  NOKNumber: string;
  WorkAddress: string;
  WorkTelephone: string;
  WorkName: string;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private router: Router
  ) {
    this.cardForm = fb.group({
      validateName: ['', Validators.required],
      validateSurname: ['', Validators.required],
      validateEmail: ['', [Validators.email, Validators.required]],
      validatePhoneNumber: ['', Validators.required],
      validateWorkNumber: ['', Validators.required],
      validateWorkName: ['', Validators.required],
      validateWorkAddress: ['', Validators.required],
      validateNOkNumber: ['', Validators.required],
      validateNOKName: ['', Validators.required]

    });
  }

  ngOnInit() {
  }

  add() {
    var data = {
      FirstName: this.FirstName,
      Surname: this.Surname,
      Email: this.Email,
      ContactNumber: this.ContactNumber,
      WorkAddress: this.WorkAddress,
      WorkTelephone: this.WorkTelephone,
      WorkName: this.WorkName,
      NOKName: this.NOKName,
      NOKNumber: this.NOKNumber
    };
    this.tenantService.addTenant(data)
      .subscribe(response => {
        if (response == 1) {
          alert("Tenant Created Successfully!");
          this.router.navigate(['/tenants/tenants']);
        }
        else {
          alert(response);
        }
      });
  }

}
