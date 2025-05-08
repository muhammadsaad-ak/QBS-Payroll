import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, map } from 'rxjs';
import { Grade, GradeResponse } from '../models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  constructor(private api: BaseApiService) {}

  addGrade(payload: Grade): Observable<Grade> {
    return this.api.post<{ data: Grade }>(
      'ems',
      'Grade',
      'AddGrade',
      payload
    ).pipe(
      map(res => res.data)
    );
  }

  listGrades(skip: number, count: number): Observable<GradeResponse> {
    return this.api.get<{ data: GradeResponse }>(
      'ems',
      'Grade',
      'ListGrade',
      {
        params: {
          skip: skip.toString(),
          count: count.toString()
        },
      }
    ).pipe(
      map(res => ({
        data: res.data.data,
        totalCount: res.data.totalCount || res.data.data.length // Fallback if totalCount is missing
      }))
    );
  }
}