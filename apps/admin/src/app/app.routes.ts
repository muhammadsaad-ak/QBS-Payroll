import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // 1. Route for Sign In page (does NOT use LayoutComponent)
  {
    path: 'signin',
    loadComponent: () => import('./features/auth/sign-in.component')
                            .then(m => m.SignInComponent)
  },

  // 2. Route for Forgot Password page (does NOT use LayoutComponent)
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component')
                            .then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'otp-verification',
    loadComponent: () => import('./features/auth/otp-verification/otp-verification.component')
                            .then(m => m.OtpVerificationComponent)
  },
  {
    path: 'set-new-password',
    loadComponent: () => import('./features/auth/set-new-password/set-new-password.component')
                            .then(m => m.SetNewPasswordComponent)
  },

  // 3. Default App Route: Redirects the base path ('') to the signin page
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  // 4. Routes that DO use the LayoutComponent (Protected area)
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'organization',
        pathMatch: 'full'
      },
      {
        path: 'organization',
        loadChildren: () => import('./features/organization/organization.routes')
                               .then(m => m.ORGANIZATION_ROUTES)
      },
      {
        path: 'position',
        loadChildren: () => import('./features/position/position.routes')
                               .then(m => m.POSITION_ROUTES)
      }
    ]
  }
];