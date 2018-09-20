import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs/index';
import { Injectable } from '@angular/core';
import { UserService } from '../shared/user.service';

@Injectable()
export class SystemGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.userService.user) {
      this.router.navigate(['auth']);
      return of(false);
    }

    return of(true);
  }
}
