export class User {
  public id: string;
  public isWaiting = false;
  public cardPayment = false;
  public comment = '';

  constructor(public name: string,
              public table: string,
              public isAdmin = false) {
  }
}
