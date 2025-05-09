// src/app/core/services/cost-center.service.ts
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, map } from 'rxjs';
import { CostCenter, CostCenterResponse } from '../models/cost-center.model';

@Injectable({
  providedIn: 'root'
})
export class CostCenterService {
  constructor(private api: BaseApiService) {}

  addCostCenter(payload: { name: string; companyID: string }): Observable<CostCenter> {
    return this.api.post<{ data: CostCenter }>(
      'ems',
      'ICostCenter',
      'AddCostCenter',
      payload
    ).pipe(
      map(res => res.data)
    );
  }

  listCostCenters(skip: number, count: number): Observable<CostCenterResponse> {
    return this.api.get<CostCenterResponse>(
      'ems',
      'ICostCenter',
      'ListCostCenter',
      {
        params: {
          skip: skip.toString(),
          count: count.toString()
        },
      }
    );
  }
}