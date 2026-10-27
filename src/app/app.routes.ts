import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Balcão Homes — Old Goan houses, restored and for sale',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  { path: '**', redirectTo: '' },
];
