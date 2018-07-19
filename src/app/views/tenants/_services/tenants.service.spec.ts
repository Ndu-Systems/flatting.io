/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TenantsService } from './tenants.service';

describe('Service: Tenants', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantsService]
    });
  });

  it('should ...', inject([TenantsService], (service: TenantsService) => {
    expect(service).toBeTruthy();
  }));
});
