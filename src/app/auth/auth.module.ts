import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthRouting } from './auth.routing';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AuthRouting,
    BarecodeScannerLivestreamModule
  ]
})
export class AuthModule { }
