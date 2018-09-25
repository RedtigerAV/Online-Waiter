import { Dish } from './dish.model';
import { User } from './user.model';

export class Order {
  public cardPayment = false;
  public comment = '';
  public dishes: Dish[] = [];
  public time: Date;

  constructor(public id: string,
              public user: User) {
  }
}
