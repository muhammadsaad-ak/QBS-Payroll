import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClasses"
      [type]="type"
      [disabled]="disabled">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;

  get buttonClasses(): string {
    return `
      px-4 py-2 rounded-md font-medium transition-colors
      ${this.getVariantClasses()}
      ${this.getSizeClasses()}
      ${this.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;
  }

  private getVariantClasses(): string {
    switch (this.variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-primary hover:bg-secondary/90';
      case 'outline':
        return 'border border-primary text-primary hover:bg-primary/10';
      default:
        return '';
    }
  }

  private getSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'text-sm px-3 py-1';
      case 'lg':
        return 'text-lg px-6 py-3';
      default:
        return '';
    }
  }
} 