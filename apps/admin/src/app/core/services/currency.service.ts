import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, map } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private api: BaseApiService) {}

  listAllCurrencies(): Observable<Currency[]> {
    return this.api.get<{ data: Currency[] }>(
      'ems',
      'IMasterDataManagement',
      'ListAllCurrencies'
    ).pipe(
      map(res => res.data)
    );
  }
}