import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ToastService } from '@portal/shared/components/services/toast.service';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QBS Payroll';
  constructor(private toastService: ToastService) {}

  showToast() {
    this.toastService.showInfo('Toast from Shell!');
  }
}
