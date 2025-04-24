import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Import Router and RouterModule

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule], // Import RouterModule if using routerLink for "Go Back"
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'] // Or .css
})
export class ForgotPasswordComponent {

  constructor(private router: Router) {}

  resetPassword(): void {
    console.log('Reset Password button clicked');
    // TODO: Implement API call to send reset link
    // Potentially navigate to a confirmation page after success
  }

  goBack(): void {
    console.log('Go Back clicked');
    // Navigate back to the sign-in route
    this.router.navigate(['admin/signin']); // Adjust '/signin' if your sign-in route is different
  }
}