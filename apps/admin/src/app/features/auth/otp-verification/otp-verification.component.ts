import { Component, OnInit } from '@angular/core'; // Removed OnDestroy for brevity, add back if using timer interval
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// 1. Import Reactive Forms modules
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// Import MatIconModule if using Angular Material icons (optional for this logic)
// import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  // 2. Add ReactiveFormsModule to imports
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // MatIconModule // Add if using mat-icon
  ],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'] // or .css
})
export class OtpVerificationComponent { // Implemented OnInit

  otpForm: FormGroup; // 3. Declare the FormGroup

  // Inject FormBuilder along with Router
  constructor(private router: Router, private fb: FormBuilder ) {
    // 4. Initialize the form (can also be done in ngOnInit)
    this.otpForm = this.fb.group({
      // Add validators: required and pattern for single digit
      otp1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp4: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });
  }

  // ngOnInit(): void {
  //   // TODO: Start timer if needed
  // }

  // TODO: Add ngOnDestroy to clear timer interval if used

  verifyOtp(): void {
    if (this.otpForm.valid) {
      const otpValue = Object.values(this.otpForm.value).join('');
      console.log('Verify OTP clicked. OTP:', otpValue);
      // TODO: Call verification API with otpValue
      // On success:
      // this.router.navigate(['/set-new-password']);
    } else {
      console.error('OTP Form is invalid');
      // Optionally mark fields as touched to show errors
      this.otpForm.markAllAsTouched();
    }
  }

  resendOtp(): void {
    console.log('Resend OTP clicked');
    // TODO: Call API to resend OTP, restart timer
  }

  // 5. Method to handle input and focus next element
  onOtpInput(event: Event, nextInput: HTMLInputElement | null): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
  
    // Handle digit input to move focus forward
    if (value && value.length === 1 && nextInput && event instanceof KeyboardEvent && /[0-9]/.test(event.key)) {
      nextInput.focus();
    }
  
    // Handle backspace to clear current input and move focus backward
    if (event instanceof KeyboardEvent && event.key === 'Backspace') {
      event.preventDefault(); // Prevent browser from clearing the previous input
      const prevInput = input.previousElementSibling as HTMLInputElement | null;
      if (prevInput) {
        // Clear the current input and update form control
        const controlName = input.getAttribute('formControlName');
        if (controlName) {
          this.otpForm.get(controlName)?.setValue('');
        }
        prevInput.focus(); // Move focus to previous input
      } else {
        // Clear the current input even if no previous input exists (e.g., otp1)
        const controlName = input.getAttribute('formControlName');
        if (controlName) {
          this.otpForm.get(controlName)?.setValue('');
        }
      }
    }
  }

  onVerifyOtp() {
    if (this.otpForm.valid) {
      this.router.navigate(['admin/set-new-password']);
    }
  }
}