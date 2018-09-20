import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth.routing';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AuthRouting,
    BarecodeScannerLivestreamModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class AuthModule { }
