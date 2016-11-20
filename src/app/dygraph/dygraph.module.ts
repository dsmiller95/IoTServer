import { NgModule } from '@angular/core';
import { DygraphCompenent } from './dygraph.component';
import { CommonModule } from '@angular/common';
import { routing } from './dygraph.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    DygraphCompenent
  ],
  bootstrap: [
    DygraphCompenent
  ]
})
export class DygraphModule {}
