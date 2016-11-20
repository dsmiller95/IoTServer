import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DygraphComponent } from './dygraph.component';

const routes: Route[] = [
  {
    path: '',
    component: DygraphComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
