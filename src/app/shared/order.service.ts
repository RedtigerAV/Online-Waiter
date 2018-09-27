import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Order } from '../models/order.model';
import { ORDER_LOCAL_KEY } from './consts';
import { User } from '../models/user.model';
import { Dish } from '../models/dish.model';
import { DishService } from './dish.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class OrderService {
  public userOrder: Order = null;

  constructor(private firebaseDB: AngularFireDatabase,
              private dishService: DishService) {
    this.userOrder = JSON.parse(localStorage.getItem(ORDER_LOCAL_KEY)) as Order;

    if (!!this.userOrder && !!this.userOrder.id) {
      this.subscribeOnDishesChanges();
    }
  }

  getAllOrders(): Observable<any> {
    return this.firebaseDB.list('orders').snapshotChanges()
      .pipe(
        map(list => list
          .map(item => ({
            ...item.payload.val()
          })))
      );
  }

  updateOrder(order: Order) {
    this.firebaseDB.list('orders').set(order.id, order);
  }

  removeOrder(order: Order) {
    this.firebaseDB.list('orders').remove(order.id);
  }

  createOrder(user: User) {
    const orderId = this.firebaseDB.createPushId();
    const order = new Order(orderId, user);

    this.userOrder = order;
    this.subscribeOnDishesChanges();
    localStorage.setItem(ORDER_LOCAL_KEY, JSON.stringify(order));
  }

  updateUserOrder(dishes: Dish[]) {
    this.setUserDishes(dishes);
    localStorage.setItem(ORDER_LOCAL_KEY, JSON.stringify(this.userOrder));
  }

  setUserDishes(dishes: Dish[]) {
    if (!dishes) {
      return;
    }

    this.userOrder.dishes = dishes.filter(dish => {
      const isAvailable = dish.isAvailable;
      const chosen = dish.amount > 0;

      return isAvailable && chosen;
    });
  }

  setCardPayment(isPayByCard: boolean) {
    this.userOrder.cardPayment = isPayByCard;
    localStorage.setItem(ORDER_LOCAL_KEY, JSON.stringify(this.userOrder));
  }

  setComment(comment: string) {
    this.userOrder.comment = comment;
    localStorage.setItem(ORDER_LOCAL_KEY, JSON.stringify(this.userOrder));
  }

  buyUserOrder() {
    this.userOrder.time = new Date();
    this.firebaseDB.list('orders').set(this.userOrder.id, this.userOrder);
    this.clearUserOrder();
  }

  subscribeOnDishesChanges() {
    this.dishService.getDishes()
      .subscribe((dishes: Dish[]) => {
        this.userOrder.dishes = this.userOrder.dishes
          .filter(dish => {
            return dishes.find(serverDish => serverDish.id === dish.id).isAvailable;
          });

        localStorage.setItem(ORDER_LOCAL_KEY, JSON.stringify(this.userOrder));
      });
  }

  clearUserOrder() {
    this.userOrder.id = this.firebaseDB.createPushId();
    this.userOrder.comment = '';
    this.userOrder.cardPayment = false;
    this.userOrder.dishes = [];

    localStorage.setItem(ORDER_LOCAL_KEY, JSON.stringify(this.userOrder));
  }
}
