import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // For routerLink, routerLinkActive
import { MatTabsModule } from '@angular/material/tabs'; // Import MatTabsModule

@Component({
  selector: 'app-org-structure-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTabsModule], // Need MatTabsModule here
  templateUrl: './org-structure-tabs.component.html',
  styleUrls: ['./org-structure-tabs.component.scss'],
  // Might need ViewEncapsulation.None if ::ng-deep doesn't work reliably
  // encapsulation: ViewEncapsulation.None
})
export class OrgStructureTabsComponent {
  // Define Tab Data
  tabs = [
    { label: 'Group of company', subtitle: 'Create group of company', link: './group-of-company' },
    { label: 'Company Creation', subtitle: 'Create legal entity', link: './company-creation' },
    { label: 'Organization Type', subtitle: 'Create organization type', link: './organization-type' },
    { label: 'Organization Structure', subtitle: 'Create organization structure', link: './org-structure-detail' },
  ];

  // constructor() { }
}