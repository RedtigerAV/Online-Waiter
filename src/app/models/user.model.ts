export class User {
  public id: string;
  public isWaitingWaiter = false;
  public isWaitingAdmin = false;
  public comment = '';

  constructor(public name: string,
              public table: string,
              public isAdmin = false) {
  }
}
