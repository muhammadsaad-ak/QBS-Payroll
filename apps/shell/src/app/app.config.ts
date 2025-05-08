import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { authInterceptor } from '../../../admin/src/app/core/interceptors/auth-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { app } from '../server';
import { ToastService } from '@portal/shared/components/services/toast.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),   
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      enableHtml: true,
      timeOut: 5000,
      closeButton: true,
    }),
    ToastService
  ],
};
