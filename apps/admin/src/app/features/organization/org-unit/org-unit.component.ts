import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-unit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-unit">
      <h2>Organization Unit</h2>
      <!-- Organization unit content will go here -->
    </div>
  `,
  styles: [`
    .org-unit {
      padding: 20px;
    }
  `]
})
export class OrgUnitComponent {} 