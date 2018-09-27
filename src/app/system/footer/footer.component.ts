import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { PageTypes } from './pageTypes.enum';
import { OrderService } from '../../shared/order.service';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'footer',
  templateUrl: './footer.template.html',
  styleUrls: ['./footer.style.less']
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() selectType = PageTypes.MENU;
  @Output() changePageType = new EventEmitter<PageTypes>();

  users: User[] = [];
  orders: Order[] = [];
  ordersLength = 0;

  adminWaiting: User[] = [];
  waiterWaiting: User[] = [];
  adminWaitingLen = 0;
  waiterWaitingLen = 0;

  private destroy$ = new Subject();

  constructor(private userService: UserService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAllOrders()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe(orders => {
        this.ordersLength = orders.length;
      });

    this.userService.getAllUsers()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.adminWaiting = users.filter(user => user.isWaitingAdmin);
        this.adminWaitingLen = this.adminWaiting.length;

        this.waiterWaiting = users.filter(user => user.isWaitingWaiter);
        this.waiterWaitingLen = this.waiterWaiting.length;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  changeType(type: PageTypes) {
    this.selectType = type;
    this.changePageType.emit(type);
  }
}
