import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// Import ReactiveFormsModule for handling forms
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Import MatIconModule if using Angular Material icons for visibility toggle
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-set-new-password',
  standalone: true,
  // Add ReactiveFormsModule and MatIconModule
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'] // or .css
})
export class SetNewPasswordComponent {
  // Flags for password visibility
  newPasswordVisible = false;
  confirmPasswordVisible = false;

  // TODO: Define FormGroup for password fields and validation
  // passwordForm: FormGroup;

  constructor(private router: Router /*, private fb: FormBuilder */) {
    // TODO: Initialize form group in constructor
    // this.passwordForm = this.fb.group({
    //   newPassword: ['', [Validators.required /*, add other validators */]],
    //   confirmPassword: ['', [Validators.required]]
    // }, { validators: passwordMatchValidator }); // Add custom validator for match
  }

  updatePassword(): void {
    console.log('Update Password clicked');
    // TODO: Check form validity
    // if (this.passwordForm.valid) {
    //   console.log('Form valid, calling API...');
    //   const newPassword = this.passwordForm.value.newPassword;
    //   // Call API to update password
    //   // On success navigate to login or dashboard
    //   // this.router.navigate(['/signin']);
    // } else {
    //   console.log('Form invalid');
    //   // Mark fields as touched to show errors
    //   this.passwordForm.markAllAsTouched();
    // }
  }

  toggleNewPasswordVisibility(): void {
    this.newPasswordVisible = !this.newPasswordVisible;
    // TODO: Update input type dynamically based on this flag
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
     // TODO: Update input type dynamically based on this flag
  }

}

// TODO: Add custom validator function `passwordMatchValidator` if using Reactive Forms