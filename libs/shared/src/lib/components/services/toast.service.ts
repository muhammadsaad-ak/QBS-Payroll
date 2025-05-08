import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  constructor(
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  showSuccess(message: string, title?: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.success(message, title || 'Success');
    }
  }

  showError(message: string, title?: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.error(message, title || 'Error');
    }
  }

  showWarning(message: string, title?: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.warning(message, title || 'Warning');
    }
  }

  showInfo(message: string, title?: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.info(message, title || 'Info');
    }
  }
}