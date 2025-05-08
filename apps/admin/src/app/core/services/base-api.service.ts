import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

type FeatureKey = keyof typeof environment.baseUrls;

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpClient) { }

  getBaseUrl(feature: FeatureKey): string {
    return environment.baseUrls[feature];
  }

  constructUrl(feature: FeatureKey, subFeature: string): string {
    return `${this.getBaseUrl(feature)}/${subFeature}`;
  }

  get<T>(
    feature: FeatureKey,
    subFeature: string,
    endpoint: string,
    options?: { params?: Record<string, string>; pathVariables?: Record<string, string> }
  ) {
    if (options?.pathVariables) {
      for (const key of Object.keys(options.pathVariables)) {
        endpoint = endpoint.replace(`{${key}}`, options.pathVariables[key]);
      }
    }

    const url = `${this.constructUrl(feature, subFeature)}/${endpoint}`;

    let httpParams = new HttpParams();
    if (options?.params) {
      for (const key of Object.keys(options.params)) {
        httpParams = httpParams.set(key, options.params[key]);
      }
    }

    return this.http.get<T>(url, { params: httpParams });
  }

  post<T>(feature: FeatureKey, subFeature: string, endpoint: string, body: any) {
    const url = `${this.constructUrl(feature, subFeature)}/${endpoint}`;
    return this.http.post<T>(url, body);
  }

  // New method to handle POST requests with headers
  postWithHeaders<T>(feature: FeatureKey, subFeature: string, endpoint: string, body: any, headers: Record<string, string>) {
    const url = `${this.constructUrl(feature, subFeature)}/${endpoint}`;
    const httpHeaders = new HttpHeaders(headers);
    return this.http.post<T>(url, body, { headers: httpHeaders });
  }

  put<T>(feature: FeatureKey, subFeature: string, endpoint: string, body: any) {
    const url = `${this.constructUrl(feature, subFeature)}/${endpoint}`;
    return this.http.put<T>(url, body);
  }

  patch<T>(feature: FeatureKey, subFeature: string, endpoint: string, body: any) {
    const url = `${this.constructUrl(feature, subFeature)}/${endpoint}`;
    return this.http.patch<T>(url, body);
  }  

  delete<T>(feature: FeatureKey, subFeature: string, endpoint: string) {
    const url = `${this.constructUrl(feature, subFeature)}/${endpoint}`;
    return this.http.delete<T>(url);
  }
}