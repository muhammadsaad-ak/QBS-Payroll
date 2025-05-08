import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, map } from 'rxjs';
import { GradeLevel, GradeLevelResponse } from '../models/grade-level.model';

@Injectable({
  providedIn: 'root'
})
export class GradeLevelService {
  constructor(private api: BaseApiService) {}

  addGradeLevel(payload: GradeLevel): Observable<GradeLevel> {
    return this.api.post<{ data: GradeLevel }>(
      'ems',
      'GradeLevel',
      'AddGradeLevel',
      payload
    ).pipe(
      map(res => res.data)
    );
  }

  listGradeLevels(skip: number, count: number): Observable<GradeLevelResponse> {
    return this.api.get<GradeLevelResponse>(
      'ems',
      'GradeLevel',
      'ListGradeLevel',
      {
        params: {
          skip: skip.toString(),
          count: count.toString()
        },
      }
    );
  }
}