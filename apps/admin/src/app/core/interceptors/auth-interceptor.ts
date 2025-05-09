import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();
  const router = inject(Router);
  // console.log('Interceptor: Token retrieved:', token);

  // Skip adding Authorization header for refresh token endpoint
  const isRefreshRequest = req.url.includes('/Auth/IAuthFeature/RefreshToken');
  let authReq = req;
  if (token && !isRefreshRequest) {
    authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    // console.log('Interceptor: Added Authorization header:', authReq.headers.get('Authorization'));
  } else {
    // console.log('Interceptor: No token or refresh request, proceeding without Authorization header');
  }

  return next(authReq).pipe(
    catchError((error) => {
      // Handle 401 errors
      if (error.status === 401) {
        // If the request is for refreshing the token and it fails with 401, log out
        if (isRefreshRequest) {
          console.error('Interceptor: Refresh token request failed with 401, logging out');
          authService.logout();
          // Optionally, redirect to login page (e.g., using Angular Router)
          inject(Router).navigate(['/admin/signin']);
          return throwError(() => new Error('Refresh token is invalid, please log in again'));
        }

        // For non-refresh requests with a 401, attempt token refresh if a token exists
        if (token && !isRefreshRequest) {
          // console.log('Interceptor: 401 Unauthorized, attempting token refresh');
          return authService.refreshToken().pipe(
            switchMap((newTokens) => {
              // console.log('Interceptor: Token refreshed:', newTokens);
              const newAuthReq = req.clone({ setHeaders: { Authorization: `Bearer ${newTokens.accessToken}` } });
              // console.log('Interceptor: Retrying with new token:', newAuthReq.headers.get('Authorization'));
              return next(newAuthReq);
            }),
            catchError((refreshError) => {
              // Handle failure of refresh token request
              console.error('Interceptor: Token refresh failed:', refreshError);
              authService.logout();
              // Optionally, redirect to login page
              inject(Router).navigate(['/admin/signin']);
              
              return throwError(() => new Error('Token refresh failed, please log in again'));
            })
          );
        }
      }
      console.error('Interceptor: HTTP error:', error);
      return throwError(() => error);
    })
  );
};