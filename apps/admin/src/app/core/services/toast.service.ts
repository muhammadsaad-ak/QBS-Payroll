import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: HotToastService) {}

  showToast(type: 'success' | 'error' | 'warn' | 'info', message: string) {
    switch (type) {
      case 'success':
        this.toast.success(message);
        break;
      case 'error':
        this.toast.error(message);
        break;
      case 'warn':
        this.toast.warning(message);
        break;
      case 'info':
        this.toast.info(message);
        break;
      default:
        this.toast.info(message);
    }
  }
}
