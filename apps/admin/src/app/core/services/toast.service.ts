import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastr = inject(ToastrService);

  showToast(type: 'success' | 'error' | 'warn', message: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip toasts during SSR
    }
    switch (type) {
      case 'success':
        this.toastr.success(message);
        break;
      case 'error':
        this.toastr.error(message);
        break;
      case 'warn':
        this.toastr.warning(message);
        break;
    }
  }
}