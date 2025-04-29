import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnDestroy{
  isCollapsed = false;
  currentView: 'main' | 'companySetup' | 'position' = 'main'; // Track the current view
  private routeSubscription: Subscription;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cdr.detectChanges(); // Trigger change detection on route change
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

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
    if (this.router && this.router.url) {
      const companySetupRoutes = [
        '/group-of-company',
        '/company-creation',
        '/organization-type',
        '/org-structure-detail',
      ];
      return companySetupRoutes.some(route => this.router.url.includes(route));
    }
    return false;
  }

  isPositionActive(): boolean {
    return this.router.url.includes('/organization');
  }
}