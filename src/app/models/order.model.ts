import { Dish } from './dish.model';
import { User } from './user.model';

export class Order {
  public id: string;
  public user: User;
  public cardPayment: boolean;
  public comment: string;
  public dishes: Dish[];
  public time: string;
}
