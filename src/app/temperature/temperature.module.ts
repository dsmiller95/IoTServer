import { NgModule } from '@angular/core';
import { TemperatureComponent } from './temperature.component';
import { CommonModule } from '@angular/common';
import { routing } from './temperature.routing';

import { DygraphCompenent } from '../dygraph/dygraph.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    TemperatureComponent,
    DygraphCompenent
  ],
  bootstrap: [
    TemperatureComponent
  ]
})
export class TemperatureModule {}
