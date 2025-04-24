import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isCollapsed = false;
  currentView: 'main' | 'companySetup' | 'position' = 'main'; // Track the current view

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  showMainMenu() {
    this.currentView = 'main';
  }

  showCompanySetup() {
    this.currentView = 'companySetup';
  }

  showPosition() {
    this.currentView = 'position';
  }

  isCompanySetupActive(): boolean {
    return this.router.url.includes('/company');
  }

  isPositionActive(): boolean {
    return this.router.url.includes('/organization');
  }
}