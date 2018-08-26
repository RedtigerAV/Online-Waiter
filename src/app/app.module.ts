import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { AppRouting } from './app.routing';
import { SystemGuard } from './system/system.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    SystemModule,
    AppRouting
  ],
  providers: [SystemGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
