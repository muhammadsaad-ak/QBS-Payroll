import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, map } from 'rxjs';
import { GroupOfCompanyAddRequest, GroupOfCompanyResponse, AddCompanyRequest, GroupOfCompany } from '../models/organization.model';

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

  listGroupOfCompanies(skip: number, count: number): Observable<GroupOfCompanyResponse> {
    return this.api.get<{ data: GroupOfCompanyResponse }>(
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

  listCompanies(skip: number, count: number): Observable<GroupOfCompanyResponse> {
    return this.api.get<{ isApiHandled: boolean, isRequestSuccess: boolean, statusCode: number, message: string, data: GroupOfCompanyResponse }>(
      'ems',
      'ICompanyManagementFeature',
      'ListCompnaies',
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

  addCompany(payload: AddCompanyRequest): Observable<GroupOfCompany> {
    return this.api.post<{ data: GroupOfCompany }>(
      'ems',
      'ICompanyManagementFeature',
      'AddCompany',
      payload
    ).pipe(
      map(res => res.data)
    );
  }
}