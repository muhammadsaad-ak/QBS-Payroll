import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./grade/grade.component').then(m => m.GradeComponent)
  },
  {
    path: 'level',
    loadComponent: () => import('./grade-level/grade-level.component').then(m => m.GradeLevelComponent)
  }
]; 