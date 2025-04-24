import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// Assuming your SignInComponent is standalone and located here:
// import { SignInComponent } from './features/auth/sign-in/sign-in.component';
// If it's not standalone, import it directly. If using loadComponent, no direct import needed here.

export const routes: Routes = [ // Renamed export to routes for clarity, ensure this is used in your app.config.ts providers
  // 1. Route for Sign In page (does NOT use LayoutComponent)
  {
    path: 'signin',
    // Use loadComponent for lazy-loading the standalone component
    loadComponent: () => import('./features/auth/sign-in.component')
                            .then(m => m.SignInComponent)
    // If SignInComponent is NOT standalone, use:
    // component: SignInComponent
  },

  // 2. Default App Route: Redirects the base path ('') to the signin page
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full' // Important: Match only if the full path is empty
  },

  // 3. Routes that DO use the LayoutComponent (Protected area)
  {
    path: '', // This path can remain empty, it will handle routes like /company, /organization etc.
    component: LayoutComponent,
    // Add canActivate: [AuthGuard] here later to protect these routes
    children: [
      {
        path: '', // Default route *within* the layout
        redirectTo: 'company',
        pathMatch: 'full'
      },
      {
        path: 'company',
        loadComponent: () => import('./features/company-management/company-list/company-list.component').then(m => m.CompanyListComponent)
      },
      {
        path: 'organization',
        loadComponent: () => import('./features/organization/org-type/org-type.component').then(m => m.OrgTypeComponent)
      },
      {
        path: 'grade',
        loadComponent: () => import('./features/grade-management/grade/grade.component').then(m => m.GradeComponent)
      }
      // Add other routes requiring the layout here
    ]
  }

  // Optional: Add a wildcard route for 404 handling at the very end
  // { path: '**', loadComponent: () => import('./path/to/not-found.component').then(m => m.NotFoundComponent) }
];