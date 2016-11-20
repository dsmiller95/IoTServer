import { NgModule } from '@angular/core';
import { ClientManager } from './client.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClientManager
  ],
  bootstrap: [
    ClientManager
  ]
})
export class TemperatureModule {}
