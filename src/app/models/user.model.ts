import { Order } from './order.model';

export const USER_LOCAL_KEY = 'userLocal';

export class User {
  public id: number;
  public isWaiting = false;
  public isAdmin = false;
  public cardPayment = false;
  public comment = '';
  public order: Order[];

  constructor(public name: string,
              public table: string) {
  }
}
