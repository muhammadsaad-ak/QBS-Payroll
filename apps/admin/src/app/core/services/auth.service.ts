import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_INFO_KEY = 'userInfo';

  constructor(
    private api: BaseApiService,
    private cookieService: CookieService
  ) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.api.post<{ data: LoginResponse }>('auth', 'IAuthFeature', 'Login', payload).pipe(
      map(res => {
        console.log('Login response:', res);
        return res.data;
      }),
      tap(data => {
        console.log('Storing tokens:', { token: data.token, refreshToken: data.refreshToken });
        this.cookieService.set(this.ACCESS_TOKEN_KEY, data.token, { path: '/', secure: false, sameSite: 'Lax' });
        this.cookieService.set(this.REFRESH_TOKEN_KEY, data.refreshToken, { path: '/', secure: false, sameSite: 'Lax' });
        this.cookieService.set(this.USER_INFO_KEY, JSON.stringify({
          name: data.name,
          email: data.email,
          userId: data.userId,
          userType: data.userType,
          roleAndActions: data.roleAndActions
        }), { path: '/', secure: false, sameSite: 'Lax' });
        console.log('Cookies set:', {
          accessToken: this.cookieService.get(this.ACCESS_TOKEN_KEY),
          refreshToken: this.cookieService.get(this.REFRESH_TOKEN_KEY),
          userInfo: this.cookieService.get(this.USER_INFO_KEY)
        });
      })
    );
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const accessToken = this.cookieService.get(this.ACCESS_TOKEN_KEY);
    const refreshToken = this.cookieService.get(this.REFRESH_TOKEN_KEY);
    console.log('Refreshing token with:', { accessToken, refreshToken });

    const payload = { accessToken, refreshToken };

    return this.api.post<{ data: { accessToken: string; refreshToken: string } }>(
      'auth', 'IAuthFeature', 'RefreshToken', payload
    ).pipe(
      map(res => res.data),
      tap(data => {
        console.log('New tokens:', data);
        this.cookieService.set(this.ACCESS_TOKEN_KEY, data.accessToken, { path: '/', secure: false, sameSite: 'Lax' });
        this.cookieService.set(this.REFRESH_TOKEN_KEY, data.refreshToken, { path: '/', secure: false, sameSite: 'Lax' });
        console.log('Cookies updated:', {
          accessToken: this.cookieService.get(this.ACCESS_TOKEN_KEY),
          refreshToken: this.cookieService.get(this.REFRESH_TOKEN_KEY)
        });
      })
    );
  }

  logout(): void {
    console.log('Logging out, deleting cookies');
    this.cookieService.delete(this.ACCESS_TOKEN_KEY, '/');
    this.cookieService.delete(this.REFRESH_TOKEN_KEY, '/');
    this.cookieService.delete(this.USER_INFO_KEY, '/');
  }

  getAuthToken(): string {
    const token = this.cookieService.get(this.ACCESS_TOKEN_KEY);
    console.log('Retrieved token:', token);
    return token;
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!this.getAuthToken();
    console.log('Is logged in:', isLoggedIn);
    return isLoggedIn;
  }

  getUserInfo(): any {
    const data = this.cookieService.get(this.USER_INFO_KEY);
    console.log('Retrieved user info:', data);
    return data ? JSON.parse(data) : null;
  }
}