import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BaseApiService } from './base-api.service';
import { ToastService } from './toast.service';
import { ApiResponse } from '../models/api-response.model';
import { LoginRequest, LoginResponse, UserData } from '../models/auth.model';
import { TransferState, makeStateKey } from '@angular/core';

// State keys for SSR
const USER_DATA_KEY = makeStateKey<UserData>('userData');
const USER_ACTIONS_KEY = makeStateKey<string[]>('userActions');
const TOKEN_EXPIRY_KEY = makeStateKey<string>('tokenExpiry');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly COOKIE_PATH = '/';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly apiService = inject(BaseApiService);
  private readonly transferState = inject(TransferState);

  private getCookieUsage(): { total: number; details: { [key: string]: number } } {
    if (!isPlatformBrowser(this.platformId)) {
      return { total: 0, details: {} };
    }
    let total = 0;
    const details: { [key: string]: number } = {};
    const cookies = this.cookieService.getAll();
    for (const key in cookies) {
      if (cookies.hasOwnProperty(key)) {
        const length = (cookies[key].length + key.length) * 2;
        details[key] = length;
        total += length;
      }
    }
    return { total, details };
  }

  login({ email, password }: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({
        isApiHandled: false,
        isRequestSuccess: false,
        statusCode: 500,
        message: 'Login not supported on server',
        data: null,
        exception: [],
      });
    }
    return this.apiService
      .post<ApiResponse<LoginResponse>>('auth', 'IAuthFeature', 'LoginFranchise', {
        email,
        password,
      })
      .pipe(
        map((response) => {
          if (!response.isRequestSuccess) {
            throw response;
          }
          const { token, refreshToken, name, userId, userType, roleAndActions } = response.data;
          this.setTokens(token, refreshToken);
          this.setUserData({ name, userId, userType });
          const actions = roleAndActions?.[0]?.actions?.map((action) => action.actionName) || [];
          this.setUserActions(actions);
          this.setTokenExpiry();
          // Cache for SSR
          this.transferState.set(USER_DATA_KEY, { name, userId, userType });
          this.transferState.set(USER_ACTIONS_KEY, actions);
          const usage = this.getCookieUsage();
          if (usage.total > 4000) {
            this.toastService.showToast('warn', 'Cookie storage nearing capacity');
          }
          return response;
        }),
        catchError((error) => {
          const apiResponse: ApiResponse<LoginResponse> = {
            isApiHandled: false,
            isRequestSuccess: false,
            statusCode: error.status || 500,
            message: error.error?.message || error.message || 'An unexpected error occurred.',
            data: null,
            exception: error.error?.exception || [],
          };
          return throwError(() => apiResponse);
        })
      );
  }

  refreshToken(): Observable<ApiResponse<LoginResponse>> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({
        isApiHandled: false,
        isRequestSuccess: false,
        statusCode: 500,
        message: 'Refresh token not supported on server',
        data: null,
        exception: [],
      });
    }
    const accessToken = this.cookieService.get('accessToken');
    const refreshToken = this.cookieService.get('refreshToken');
    if (!accessToken || !refreshToken) {
      return throwError(() => new Error('Missing tokens for refresh operation'));
    }
    return this.apiService
      .post<ApiResponse<LoginResponse>>('auth', 'IAuthFeature', 'RefreshToken', {
        accessToken,
        refreshToken,
      })
      .pipe(
        tap((response) => {
          if (response.isRequestSuccess && response.data?.token && response.data?.refreshToken) {
            this.setTokens(response.data.token, response.data.refreshToken);
            this.setTokenExpiry();
            this.transferState.set(
              TOKEN_EXPIRY_KEY,
              (new Date().getTime() + 60 * 60 * 1000).toString()
            );
          }
        }),
        map((response) => {
          if (!response.isRequestSuccess) {
            throw new Error(response.message || 'Refresh token failed');
          }
          return response;
        }),
        catchError((error) => {
          const apiResponse: ApiResponse<LoginResponse> = {
            isApiHandled: false,
            isRequestSuccess: false,
            statusCode: error.status || 500,
            message: error.error?.message || error.message || 'An unexpected error occurred.',
            data: null,
            exception: error.error?.exception || [],
          };
          return throwError(() => apiResponse);
        })
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.deleteAll(this.COOKIE_PATH);
    }
    this.transferState.remove(USER_DATA_KEY);
    this.transferState.remove(USER_ACTIONS_KEY);
    this.transferState.remove(TOKEN_EXPIRY_KEY);
    this.toastService.showToast('success', 'Logged out successfully');
    this.router.navigate(['/admin/sign-in'], { replaceUrl: true });
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('accessToken', accessToken, {
        expires: 1, // 1 day
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
        // HttpOnly must be set server-side
      });
      this.cookieService.set('refreshToken', refreshToken, {
        expires: 7, // 7 days
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
        // HttpOnly must be set server-side
      });
    }
  }

  private setUserData({ name, userId, userType }: UserData): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('fms_userId', userId, {
        expires: 7,
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
      });
      this.cookieService.set('fms_userType', userType, {
        expires: 7,
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
      });
      this.cookieService.set('fms_name', name, {
        expires: 7,
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
      });
    }
  }

  private setUserActions(actions: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('fms_userActions', JSON.stringify(actions), {
        expires: 7,
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
      });
    }
  }

  private setTokenExpiry(): void {
    const expiryTime = (new Date().getTime() + 60 * 60 * 1000).toString(); // 1 hour
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('tokenExpiry', expiryTime, {
        expires: 7,
        path: this.COOKIE_PATH,
        secure: location.protocol === 'https:',
        sameSite: 'Strict',
      });
    }
    this.transferState.set(TOKEN_EXPIRY_KEY, expiryTime);
  }

  isTokenExpired(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      const expiryTime = this.transferState.get(TOKEN_EXPIRY_KEY, null);
      if (!expiryTime) return true;
      return new Date().getTime() > parseInt(expiryTime);
    }
    const expiryTime = this.cookieService.get('tokenExpiry');
    if (!expiryTime) return true;
    return new Date().getTime() > parseInt(expiryTime);
  }

  getUserData(): Observable<ApiResponse<UserData>> {
    if (!isPlatformBrowser(this.platformId)) {
      const cachedUserData = this.transferState.get(USER_DATA_KEY, null);
      if (cachedUserData) {
        return of({
          isApiHandled: true,
          isRequestSuccess: true,
          statusCode: 200,
          message: 'User data from cache',
          data: cachedUserData,
          exception: [],
        });
      }
      return of({
        isApiHandled: false,
        isRequestSuccess: false,
        statusCode: 500,
        message: 'User data not available on server',
        data: null,
        exception: [],
      });
    }
    return this.apiService
      .get<ApiResponse<UserData>>('auth', 'IAuthFeature', 'GetUserData')
      .pipe(
        tap((response) => {
          if (response.isRequestSuccess && response.data) {
            this.setUserData(response.data);
            this.transferState.set(USER_DATA_KEY, response.data);
          }
        }),
        catchError((error) => {
          const apiResponse: ApiResponse<UserData> = {
            isApiHandled: false,
            isRequestSuccess: false,
            statusCode: error.status || 500,
            message: error.error?.message || error.message || 'An unexpected error occurred.',
            data: null,
            exception: error.error?.exception || [],
          };
          return throwError(() => apiResponse);
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId) || this.isTokenExpired()) {
      return of(false);
    }
    return this.getUserData().pipe(
      map((response) => response.isRequestSuccess && !!response.data),
      catchError(() => of(false))
    );
  }

  hasAction(actionName: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      const actions = this.transferState.get(USER_ACTIONS_KEY, []);
      return Array.isArray(actions) && actions.includes(actionName);
    }
    const actionsJson = this.cookieService.get('fms_userActions');
    if (!actionsJson) {
      return false;
    }
    try {
      const actions = JSON.parse(actionsJson);
      return Array.isArray(actions) && actions.includes(actionName);
    } catch (error) {
      return false;
    }
  }
}