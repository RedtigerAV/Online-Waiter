import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { USER_LOCAL_KEY } from './consts';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { OrderService } from './order.service';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserService {
  public user: User;

  constructor(private firebaseDB: AngularFireDatabase,
              private router: Router,
              private orderService: OrderService) {
    this.user = JSON.parse(localStorage.getItem(USER_LOCAL_KEY)) as User;

    this.subscribeOnUserChanges();
  }

  setUser(user: User) {
    const userId = this.firebaseDB.createPushId();

    user.id = userId;
    this.user = user;

    localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(user));

    if (!this.user.isAdmin) {
      this.firebaseDB.list('users').set(this.user.id, this.user);
      this.subscribeOnUserChanges();
      this.orderService.createOrder(this.user);
    }

    this.router.navigate(['../']);
  }

  getAllUsers(): Observable<any> {
    return this.firebaseDB.list('users').snapshotChanges()
      .pipe(
        map(list => list
          .map(item => ({
            ...item.payload.val()
          })))
      );
  }

  updateUser(user: User) {
    this.firebaseDB.list('users').set(user.id, user);
  }

  toggleWaiterWaiting(wait: boolean) {
    this.user.isWaitingWaiter = wait;
    localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(this.user));
    this.firebaseDB.list('users').set(this.user.id, this.user);
  }

  toggleAdminWaiting(wait: boolean) {
    this.user.isWaitingAdmin = wait;
    localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(this.user));
    this.firebaseDB.list('users').set(this.user.id, this.user);
  }

  subscribeOnUserChanges() {
    if (!!this.user && !!this.user.id) {
      this.firebaseDB.list(`users/${this.user.id}`).snapshotChanges()
        .pipe(
          map(list => list
            .map(item => ({
              key: item.key,
              val: item.payload.val()
            }))
          )
        )
        .subscribe(usersSettings => {
          for (const sets of usersSettings) {
            this.user[sets.key] = sets.val;
          }
        });
    }
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }
}
