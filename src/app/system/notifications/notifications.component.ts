import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.template.html',
  styleUrls: ['./notifications.style.less']
})
export class NotificationsComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

  callAdmin() {
    this.userService.toggleAdminWaiting(true);
  }

  callWaiter() {
    this.userService.toggleWaiterWaiting(true);
  }
}
