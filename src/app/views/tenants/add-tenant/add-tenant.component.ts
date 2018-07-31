import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TenantService } from '../../../services';
import { Message } from 'primeng/api';


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
  msgs: Message[] = [];
  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private router: Router
  ) {
    this.cardForm = fb.group({
      validateName: [null, Validators.required],
      validateSurname: [null, Validators.required],
      validateEmail: [null, [Validators.email, Validators.required]],
      validatePhoneNumber: [null, Validators.required],
      validateWorkNumber: [null, Validators.required],
      validateWorkName: [null, Validators.required],
      validateWorkAddress: [null, Validators.required],
      validateNOkNumber: [null, Validators.required],
      validateNOKName: [null, Validators.required]

    });
  }

  ngOnInit() {
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Tenant Registered Successfully' });
  }

  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Error Message', detail: `${msg}` });
  }

  add() {

    if (!this.FirstName) {
      this.showError("First Name is required");
      return false;
    }
    if (!this.Surname) {
      this.showError("Surname is required");
      return false;
    } if (!this.Email) {
      this.showError("Email is required");
      return false;
    } if (!this.ContactNumber) {
      this.showError("Contact Number is required");
      return false;
    } if (!this.WorkAddress) {
      this.showError("Work Address is required");
      return false;
    } if (!this.WorkTelephone) {
      this.showError("Work Telephone is required");
      return false;
    } if (!this.WorkName) {
      this.showError("Work Name is required");
      return false;
    } if (!this.NOKName) {
      this.showError("Next Of Kin Name is required");
      return false;
    } if (!this.NOKNumber) {
      this.showError("Next Of Kin Number is required");
      return false;
    }
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
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/tenants']);
          }, 2000);
        }
        else {
          alert(response);
        }
      });
  }

}
