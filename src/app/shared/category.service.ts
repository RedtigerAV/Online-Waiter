import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs/index';
import { AngularFireDatabase } from 'angularfire2/database';
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

  postCategory(cat: Category) {
    // const id = this.firebaseDB.createPushId();
    // const item = {id, name: 'lol', photo: ''};
    // this.firebaseDB.list('categories').set(item.id, item);
  }
}
