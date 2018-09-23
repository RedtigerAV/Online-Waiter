import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SystemRouting } from './system.routing';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    SystemComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SystemRouting,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
  ]
})
export class SystemModule {
}
