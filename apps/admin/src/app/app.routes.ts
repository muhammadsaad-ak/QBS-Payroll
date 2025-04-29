import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

// Assuming your components are standalone and located in features/auth/
// Make sure the paths in loadComponent are correct relative to this routes file.

export const routes: Routes = [
  // 1. Route for Sign In page (does NOT use LayoutComponent)
  {
    path: 'signin',
    loadComponent: () => import('./features/auth/sign-in.component') // Verify this path is correct
                            .then(m => m.SignInComponent)
  },

  // 2. ADDED: Route for Forgot Password page (does NOT use LayoutComponent)
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component') // Assuming this path based on generation command
                            .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'otp-verification',
    loadComponent: () => import('./features/auth/otp-verification/otp-verification.component') // Assuming this path based on generation command
                            .then(m => m.OtpVerificationComponent)
  },
  {
    path: 'set-new-password',
    loadComponent: () => import('./features/auth/set-new-password/set-new-password.component') // Assuming this path based on generation command
                            .then(m => m.SetNewPasswordComponent)
  },

  // 3. Default App Route: Redirects the base path ('') to the signin page
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full' // Important: Match only if the full path is empty
  },

  // 4. Routes that DO use the LayoutComponent (Protected area)
  {
    path: '', // This path handles routes within the layout like /company, /organization etc.
    component: LayoutComponent,
    // Add canActivate: [AuthGuard] here later to protect these routes
    children: [
      {
        path: '', // Default route *within* the layout
        redirectTo: 'organization',
        pathMatch: 'full'
      },
      // {
      //   path: 'organization',
      //   loadComponent: () => import('./features/organization/organization-structure-page.component')
      //                           .then(m => m.OrganizationStructurePageComponent)
      // },
      // Corrected entry in app.routes.ts -> LayoutComponent children
{
  path: 'organization', // Base path for this feature
  // CORRECT: Use loadChildren to load the feature's routes
  loadChildren: () => import('./features/organization/organization.routes')
                         .then(m => m.ORGANIZATION_ROUTES) // Point to the exported Routes array
},
      // {
      //   path: 'organization',
      //   loadComponent: () => import('./features/organization/org-type/org-type.component')
      //                           .then(m => m.OrgTypeComponent)
      // },
      // {
      //   path: 'grade',
      //   loadComponent: () => import('./features/grade-management/grade/grade.component')
      //                           .then(m => m.GradeComponent)
      // }
      // Add other routes requiring the layout here
    ]
  }

  // Optional: Add a wildcard route for 404 handling at the very end
  // { path: '**', loadComponent: () => import('./path/to/not-found.component').then(m => m.NotFoundComponent) }
];