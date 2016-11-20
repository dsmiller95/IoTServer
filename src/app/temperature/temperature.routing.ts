import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TemperatureComponent } from './temperature.component';

const routes: Route[] = [
  {
    path: '',
    component: TemperatureComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
