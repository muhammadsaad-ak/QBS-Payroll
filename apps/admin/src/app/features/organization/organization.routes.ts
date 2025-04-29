// Corrected organization.routes.ts
import { Routes } from '@angular/router';

// Import only the components needed for THESE routes
import { OrganizationStructurePageComponent } from './organization-structure-page.component';
import { GroupOfCompanyComponent } from './group-of-company/group-of-company.component';
import { CompanyCreationComponent } from './company-creation/company-creation.component';
import { OrganizationTypeComponent } from './organization-type/organization-type.component';
import { OrgStructureDetailComponent } from './org-structure-detail/org-structure-detail.component';

export const ORGANIZATION_ROUTES: Routes = [
  {
    // Path '' makes these routes load directly under /organization
    path: '',
    // The component loaded by the PARENT route ('loadChildren') handles the layout (tabs + outlet)
    // So, we typically define the component that provides the <router-outlet> for THESE children.
    component: OrganizationStructurePageComponent, // This component should contain the <app-org-structure-tabs> and <router-outlet>
    children: [
      // Default route redirects to the first tab's path
      { path: '', redirectTo: 'group-of-company', pathMatch: 'full' },

      // Child routes for each tab - Corrected paths
      { path: 'group-of-company', component: GroupOfCompanyComponent },
      { path: 'company-creation', component: CompanyCreationComponent },
      { path: 'organization-type', component: OrganizationTypeComponent },
      { path: 'org-structure-detail', component: OrgStructureDetailComponent },
    ]
  },
  // You could define other routes specific to the organization feature here if needed
  // e.g., { path: 'settings', component: OrgSettingsComponent }
];