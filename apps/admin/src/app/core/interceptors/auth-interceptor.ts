import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();
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
      // Only attempt token refresh for 401 errors, non-refresh requests, and if a token exists
      if (error.status === 401 && token && !isRefreshRequest) {
        // console.log('Interceptor: 401 Unauthorized, attempting token refresh');
        return authService.refreshToken().pipe(
          switchMap((newTokens) => {
            // console.log('Interceptor: Token refreshed:', newTokens);
            const newAuthReq = req.clone({ setHeaders: { Authorization: `Bearer ${newTokens.accessToken}` } });
            // console.log('Interceptor: Retrying with new token:', newAuthReq.headers.get('Authorization'));
            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            console.error('Interceptor: Token refresh failed:', refreshError);
            // Logout and redirect to login page on refresh failure
            authService.logout();
            // Optionally, redirect to login page (e.g., using Angular Router)
            // inject(Router).navigate(['/login']);
            return throwError(() => new Error('Token refresh failed, please log in again'));
          })
        );
      }
      console.error('Interceptor: HTTP error:', error);
      return throwError(() => error);
    })
  );
};