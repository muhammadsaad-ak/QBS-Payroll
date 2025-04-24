import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sign-in', 
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {

  constructor(private router: Router) {}

  login(): void {
    this.router.navigateByUrl('admin/company');
  }
}