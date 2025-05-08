import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.post<any>(`${this.apiUrl}`, {}).pipe(
      map(response => response.data.map((country: any) => country.country)),
      catchError(() => of([]))
    );
  }

  getStates(country: string): Observable<string[]> {
    return this.http.post<any>(`${this.apiUrl}/states`, { country }).pipe(
      map(response => response.data.states.map((state: any) => state.name)),
      catchError(() => of([]))
    );
  }

  getCities(country: string, state: string): Observable<string[]> {
    return this.http.post<any>(`${this.apiUrl}/state/cities`, { country, state }).pipe(
      map(response => response.data),
      catchError(() => of([]))
    );
  }

  getTimeZones(): Observable<string[]> {
    return this.http.post<any>(`${this.apiUrl}/timezone`, {}).pipe(
      map(response => response.data.map((tz: any) => tz.timezone)),
      catchError(() => of(['[UTC+5:00] Pakistan Standard Time']))
    );
  }
}