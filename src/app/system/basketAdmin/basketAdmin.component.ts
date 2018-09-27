import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../models/order.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators';
import { Dish } from '../../models/dish.model';

@Component({
  selector: 'basket-admin',
  templateUrl: './basketAdmin.template.html',
  styleUrls: ['./basketAdmin.style.less']
})
export class BasketAdminComponent implements OnInit, OnDestroy {
  orders: Order[];
  ordersLength = 0;

  private destroy$ = new Subject();

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAllOrders()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe((orders: Order[]) => {
        this.orders = orders;
        this.ordersLength = orders.length;
    });
  }

  toggleDish(event, dish: Dish, order: Order) {
    dish.isReady = event.checked;
    this.orderService.updateOrder(order);
  }

  isReadyButtonDisabled(dishes: Dish[]): boolean {
    return dishes.every(dish => dish.isReady);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  removeOrder(order: Order) {
    this.orderService.removeOrder(order);
  }
}
