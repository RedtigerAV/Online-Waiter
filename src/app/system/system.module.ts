import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SystemRouting } from './system.routing';

@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SystemRouting
  ]
})
export class SystemModule {
}
