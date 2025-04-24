import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [key: string]: string } = {};
  private currentLang = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    localStorage.setItem('appLanguage', lang);
    this.http.get(`/assets/i18n/${lang}.json`).subscribe((translations: any) => {
      this.translations = translations;
      this.currentLang.next(lang);
    });
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }

  getLanguage() {
    return this.currentLang.asObservable();
  }
}
