import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/internal/operators';
import { Dish } from '../models/dish.model';

@Injectable()
export class DishService {
  constructor(private firebaseDB: AngularFireDatabase) {
  }

  getDishes(): Observable<any> {
    return this.firebaseDB.list('dishes').snapshotChanges()
      .pipe(
        map(list => list
          .map(item => ({
            ...item.payload.val()
          })))
      );
  }

  hideDish(dish: Dish) {
    dish.isAvailable = false;
    this.firebaseDB.list('dishes').set(dish.id, dish);
  }

  returnDish(dish: Dish) {
    dish.isAvailable = true;
    this.firebaseDB.list('dishes').set(dish.id, dish);
  }
}
