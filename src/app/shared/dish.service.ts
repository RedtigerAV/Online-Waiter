import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/internal/operators';

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
}
