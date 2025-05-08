import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LocationResponse, Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://payrollstaging.qbscocloud.net:31112/EmsAPI/ILocationManagement';

  constructor(private http: HttpClient) {}

  addLocation(location: Location): Observable<Location> {
    return this.http.post<{ data: Location }>(`${this.apiUrl}/AddLocation`, location).pipe(
      map(response => response.data)
    );
  }

  listLocations(skip: number, count: number): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${this.apiUrl}/ListLocation`, {
      params: {
        skip: skip.toString(),
        count: count.toString()
      }
    });
  }
}