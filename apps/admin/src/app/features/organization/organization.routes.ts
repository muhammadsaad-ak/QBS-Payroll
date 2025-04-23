import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./org-type/org-type.component').then(m => m.OrgTypeComponent)
  },
  {
    path: 'unit',
    loadComponent: () => import('./org-unit/org-unit.component').then(m => m.OrgUnitComponent)
  }
]; 