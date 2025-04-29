import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrgStructureTabsComponent } from './tabs/org-structure-tabs.component';

@Component({
  selector: 'app-organization-structure-page',
  imports: [CommonModule, RouterModule, OrgStructureTabsComponent],
  templateUrl: './organization-structure-page.component.html',
  styleUrl: './organization-structure-page.component.scss',
})
export class OrganizationStructurePageComponent {}
