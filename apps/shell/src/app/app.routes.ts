import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'admin',
    loadChildren: () => import('../../../admin/src/app/remote-entry/entry.module').then((m) => m.RemoteEntryModule),
  },
];
