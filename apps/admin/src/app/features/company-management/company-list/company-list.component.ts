import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="company-list">
      <h2>Company List</h2>
      <!-- Company list content will go here -->
    </div>
  `,
  styles: [`
    .company-list {
      padding: 20px;
    }
  `]
})
export class CompanyListComponent {} 