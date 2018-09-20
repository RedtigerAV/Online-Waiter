import { Dish } from './dish.model';

export class Order {
  public id: number;
  public userName: string;
  public userTable: string;
  public cardPayment: boolean;
  public comment: string;
  public dishes: Dish[];
}
