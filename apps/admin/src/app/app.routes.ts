import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
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
    ]
  }
];
