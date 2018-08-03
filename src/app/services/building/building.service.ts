import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../shared/config';

@Injectable()
export class BuildingService {
  url = API_URL
  constructor(private httpClient: HttpClient) { }
  updateBuilding(data): Observable<any> {
    return this.httpClient.post(`${this.url}/building/update-building.php`, data);
  }
  addBuilding(data): Observable<any> {
    return this.httpClient.post(`${this.url}/building/add-building.php`, data);
  }

}
