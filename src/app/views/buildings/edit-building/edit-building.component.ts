import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, ConfirmationService } from 'primeng/api';
import { SelectService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from '../../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.scss'],
  providers: [ConfirmationService]
})
export class EditBuildingComponent implements OnInit {

  building$: Observable<any>;
  buildingId: number;
  msgs: Message[] = [];
  cardForm: FormGroup;
  constructor(
    private selectService: SelectService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private buildingService: BuildingService
  ) { 
    this.cardForm = fb.group({
      validateName: ['', Validators.required],
      validateAddressLine1: ['', Validators.required],
      validateAddressLine2: ['', Validators.required],
      validateAddressLine3: ['', Validators.required],
      validateCity: ['', Validators.required],
      validateCode: ['', Validators.required],
     });
  }

  ngOnInit() {
    this.buildingId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.building$ = this.selectService.select(`buildings WHERE BuildingId = ${this.buildingId}`);
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Building Updated Successfully' });
  }
  confirm(building) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.update(building);
      }
    });
  }
  update(building) {
    var data = {
      BuildingId: building.BuildingId,
      BuildingName: building.BuildingName,
      AddressLine1: building.AddressLine1,
      AddressLine2: building.AddressLine2,
      AddressLine3: building.AddressLine3,
      City: building.City,
      PostCode: building.PostCode,
      ManagerId: building.ManagerId,
      StatusId: building.StatusId
    };

    this.buildingService.updateBuilding(data)
      .subscribe(response => {
        if (response == 1) {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/buildings/view', building.BuildingId]);
          }, 2000);
        }
        else {
          alert(response);
        }
      })

  }
}
