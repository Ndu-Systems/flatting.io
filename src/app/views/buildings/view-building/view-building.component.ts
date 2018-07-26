import { BuildingService } from './../../../services/building/building.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectService } from '../../../shared/services';
@Component({
  selector: 'app-view-building',
  templateUrl: './view-building.component.html',
  styleUrls: ['./view-building.component.scss'],
  providers: [ConfirmationService]
})
export class ViewBuildingComponent implements OnInit {
  building$: Observable<any>;
  buildingId: number;
  msgs: Message[] = [];

  constructor(
    private selectService: SelectService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private buildingService: BuildingService
  ) { }

  ngOnInit() {
    this.buildingId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.building$ = this.selectService.select(`buildings WHERE BuildingId = ${this.buildingId}`);
  }
  edit(building){
    this.router.navigate(['/buildings/edit', building.BuildingId]);
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Success Message', detail: 'Building Archived Successfully' });
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
      StatusId: 2
    };

    this.buildingService.updateBuilding(data)
      .subscribe(response => {
        if (response == 1) {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['/buildings']);

          }, 2000);
        }
        else {
          alert(response);
        }
      })

  }
}
