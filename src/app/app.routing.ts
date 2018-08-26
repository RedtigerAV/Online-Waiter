import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system/system.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent, pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [SystemGuard]
})
export class AppRouting {
}
