import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BuildingService } from '../../../services';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {
  cardForm: FormGroup;
  BuildingName: any
  AddressLine1: any
  AddressLine2: any
  AddressLine3: any
  City: any
  PostCode: any
  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private router : Router
  ) {
      this.cardForm = fb.group({
      validateName: [null, Validators.required],
      validateCity: [null, Validators.required],
      validateAddressLine1: [null, Validators.required],
      validateAddressLine2: [null, Validators.required],
      validateAddressLine3: [null, Validators.required],
      validatePostCode: [null, Validators.required],
    })
  }

  ngOnInit() {
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Building Registered Successfully' });
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Error Message', detail: `${msg}` });
  }
  add() {
    if (!this.BuildingName) {
      this.showError("Buiding Name is required");
      return false;
    }
    if (!this.AddressLine1) {
      this.showError("Address is required");
      return false;
    }
    if (!this.AddressLine2) {
      this.showError("Address is required");
      return false;
    }
    if (!this.AddressLine3) {
      this.showError("Address is required");
      return false;
    }
    if (!this.City) {
      this.showError("City is required");
      return false;
    }
    if (!this.PostCode) {
      this.showError("Post Code is required");
      return false;
    }
    var data = {
      BuildingName: this.BuildingName,
      AddressLine1: this.AddressLine1,
      AddressLine2: this.AddressLine2,
      AddressLine3: this.AddressLine3,
      City: this.City,
      PostCode: this.PostCode
    }
    this.buildingService.addBuilding(data)
    .subscribe(response =>{
      if(response == 1){
        this.showSuccess();
        setTimeout(()=>{
          this.router.navigate(['/buildings']);
        }, 2000);
      }
      else{
        this.showError(response);
      }
    });    
  }
}
