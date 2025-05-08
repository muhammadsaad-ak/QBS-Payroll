import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnDestroy {
  isCollapsed = false;
  currentView: 'main' | 'companySetup' | 'position' = 'main';
  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sidebarService: SidebarService
  ) {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cdr.detectChanges();
      }
    });

    // Subscribe to the sidebar service to get the collapsed state
    this.sidebarService.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  showMainMenu(): void {
    this.currentView = 'main';
  }

  showCompanySetup(): void {
    this.currentView = 'companySetup';
  }

  showPosition(): void {
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
    if (this.router && this.router.url) {
      const position = [
        '/grade',
        '/grade-level',
        '/location',
        '/cost-center',
        '/position-type',
        '/position-status',
        '/employment-type',
        '/employment-group',
        '/grade-assignment',
        '/job',
        '/function',
        '/pra-role',
        '/position',
      ];
      return position.some(route => this.router.url.includes(route));
    }
    return false;
  }
}