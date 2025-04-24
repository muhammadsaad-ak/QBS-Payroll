import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-sign-in', // Use the selector generated for your component
  standalone: true,
  imports: [CommonModule], // Add FormsModule or ReactiveFormsModule later for real forms
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  // Inject the Router service in the constructor
  constructor(private router: Router) {}

  // Create a method to handle the static login navigation
  login(): void {
    console.log('Simulating login...'); // Optional: for debugging

    // Navigate to the default route INSIDE your main layout
    // Based on your routes, '/company' seems like the default inner route.
    // Adjust '/company' if your intended default dashboard/landing page is different.
    this.router.navigateByUrl('admin/company');
  }
}