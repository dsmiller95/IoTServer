import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'temperature'},
  { loadChildren: 'app/dashboard/dashboard.module#DashboardModule', path: 'dashboard' },
  { loadChildren: 'app/temperature/temperature.module#TemperatureModule', path: 'temperature' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
