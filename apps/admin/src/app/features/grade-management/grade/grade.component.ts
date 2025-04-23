import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grade">
      <h2>Grade Management</h2>
      <!-- Grade content will go here -->
    </div>
  `,
  styles: [`
    .grade {
      padding: 20px;
    }
  `]
})
export class GradeComponent {} 