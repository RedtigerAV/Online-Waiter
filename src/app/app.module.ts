import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SystemModule } from './system/system.module';
import { AppRouting } from './app.routing';
import { SystemGuard } from './system/system.guard';
import { UserService } from './shared/user.service';
import { CategoryService } from './shared/category.service';
import { OrderService } from './shared/order.service';
import { DishService } from './shared/dish.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    SystemModule,
    AppRouting,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    SystemGuard,
    UserService,
    CategoryService,
    OrderService,
    DishService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
