import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, map } from 'rxjs';
import { GroupOfCompanyAddRequest, GroupOfCompanyResponse, GroupOfCompanyListItem } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  constructor(private api: BaseApiService) {}

  addGroupOfCompany(payload: GroupOfCompanyAddRequest): Observable<GroupOfCompanyResponse> {
    return this.api.post<{ data: GroupOfCompanyResponse }>(
      'ems',
      'IGroupOfCompanyManagement',
      'AddGroupOfCompany',
      payload
    ).pipe(
      map(res => res.data)
    );
  }

  listGroupOfCompanies(skip: number, count: number,): Observable<GroupOfCompanyListItem[]> {
    return this.api.get<{ data: GroupOfCompanyListItem[] }>(
      'ems',
      'IGroupOfCompanyManagement',
      'ListGroupOfCompany',
      {
        params: {
          count: count.toString(),
          skip: skip.toString()
        },
      }
    ).pipe(
      map(res => res.data)
    );
  }
}