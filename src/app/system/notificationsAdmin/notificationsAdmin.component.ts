import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators';
import { UserService } from '../../shared/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'notifications-admin',
  templateUrl: './notificationsAdmin.template.html',
  styleUrls: ['./notificationsAdmin.style.less']
})
export class NotificationsAdminComponent implements OnInit, OnDestroy {
  adminWaiting: User[] = [];
  waiterWaiting: User[] = [];
  adminWaitingLen = 0;
  waiterWaitingLen = 0;

  private destroy$ = new Subject();

  constructor (private userServise: UserService) {
  }

  ngOnInit() {
    this.userServise.getAllUsers()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.adminWaiting = users.filter(user => user.isWaitingAdmin);
        this.adminWaitingLen = this.adminWaiting.length;

        this.waiterWaiting = users.filter(user => user.isWaitingWaiter);
        this.waiterWaitingLen = this.waiterWaiting.length;
      });
  }

  giveAdmin(user: User) {
    user.isWaitingAdmin = false;
    this.userServise.updateUser(user);
  }

  giveWaiter(user: User) {
    user.isWaitingWaiter = false;
    this.userServise.updateUser(user);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
