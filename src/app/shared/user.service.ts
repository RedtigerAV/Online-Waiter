import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { User, USER_LOCAL_KEY } from '../models/user.model';

@Injectable()
export class UserService {
  public user: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem(USER_LOCAL_KEY)) as User;
  }

  setUser(user: User) {
    this.user = user;
    localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(user));
  }

  makeUserAsAdmin() {
    this.user.isAdmin = true;
  }
}
