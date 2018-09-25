import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class CategoryService {
  constructor(private firebaseDB: AngularFireDatabase) {
  }

  getCategories(): Observable<any> {
    return this.firebaseDB.list('categories').snapshotChanges()
      .pipe(
        map(list => list
          .map(item => ({
            ...item.payload.val()
          })))
      );
  }
}
