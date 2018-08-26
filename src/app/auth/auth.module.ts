import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthRouting } from './auth.routing';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AuthRouting
  ]
})
export class AuthModule { }
