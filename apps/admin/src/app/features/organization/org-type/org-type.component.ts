import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-type',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-type">
      <h2>Organization Type</h2>
      <!-- Organization type content will go here -->
    </div>
  `,
  styles: [`
    .org-type {
      padding: 20px;
    }
  `]
})
export class OrgTypeComponent {} 