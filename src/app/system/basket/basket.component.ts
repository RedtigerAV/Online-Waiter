import {
  Component, EventEmitter,
  OnInit, Output
} from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Dish } from '../../models/dish.model';
import { PageTypes } from '../footer/pageTypes.enum';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'basket',
  templateUrl: './basket.template.html',
  styleUrls: ['./basket.style.less']
})
export class BasketComponent implements OnInit {
  @Output() changePageType = new EventEmitter<PageTypes>();
  dishes: Dish[] = [];
  cardPayment: boolean;
  userOrderComment = '';

  constructor(private orderService: OrderService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.dishes = this.orderService.userOrder.dishes
      .filter(dish => dish.isAvailable || this.userService.isAdmin());
    this.cardPayment = this.orderService.userOrder.cardPayment;
    this.userOrderComment = this.orderService.userOrder.comment;
  }

  onDishRemove(dish: Dish) {
    if (dish.amount > 0) {
      dish.amount--;
    }

    this.orderService.updateUserOrder(this.dishes);
  }

  onDishAdd(dish: Dish) {
    dish.amount++;

    this.orderService.updateUserOrder(this.dishes);
  }

  onAddComment(dish: Dish, comment: string) {
    dish.comment = comment;
    this.orderService.updateUserOrder(this.dishes);
  }

  allSum(): number {
    let ans = 0;

    this.dishes.forEach(dish => {
      ans += dish.sum * dish.amount;
    });

    return ans;
  }

  setOrderComment(comment: string) {
    this.orderService.setComment(comment);
  }

  byCash() {
    this.cardPayment = false;
    this.orderService.setCardPayment(this.cardPayment);
  }

  byCard() {
    this.cardPayment = true;
    this.orderService.setCardPayment(this.cardPayment);
  }

  onBuy() {
    this.orderService.buyUserOrder();
    this.changePageType.emit(PageTypes.MENU);
  }
}
