import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { USER_LOCAL_KEY } from './consts';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  public user: User;

  constructor(private firebaseDB: AngularFireDatabase,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem(USER_LOCAL_KEY)) as User;
  }

  setUser(user: User) {
    const userId = this.firebaseDB.createPushId();

    user.id = userId;
    this.user = user;

    localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(user));

    if (!this.user.isAdmin) {
      this.firebaseDB.list('users').set(this.user.id, this.user);
    }

    this.router.navigate(['../']);
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }
}
