import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AboutComponent } from './about.component';

const routes: Route[] = [
  {
    path: '',
    component: AboutComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
