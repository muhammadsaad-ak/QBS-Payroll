import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '@portal/shared/components/services/toast.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) {}

  login(): void {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(payload).subscribe({
      next: () => {
        this.router.navigateByUrl('admin/organization');
        this.toastService.showSuccess('Login successful!');
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid credentials or server error');
      }
    });
  }
}
