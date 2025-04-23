import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grade-level',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grade-level">
      <h2>Grade Level</h2>
      <!-- Grade level content will go here -->
    </div>
  `,
  styles: [`
    .grade-level {
      padding: 20px;
    }
  `]
})
export class GradeLevelComponent {} 