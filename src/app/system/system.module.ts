import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SystemRouting } from './system.routing';
import { FooterComponent } from './footer/footer.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatStepperModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { BasketComponent } from './basket/basket.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BasketAdminComponent } from './basketAdmin/basketAdmin.component';
import { NotificationsAdminComponent } from './notificationsAdmin/notificationsAdmin.component';

@NgModule({
  declarations: [
    SystemComponent,
    FooterComponent,
    MenuComponent,
    BasketComponent,
    NotificationsComponent,
    BasketAdminComponent,
    NotificationsAdminComponent
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
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    MatStepperModule,
    MatCheckboxModule
  ],
  providers: [
  ]
})
export class SystemModule {
}
