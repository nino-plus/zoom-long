import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getLikedArticleIds(uid: string): Promise<string[]> {
    return this.db
      .collectionGroup<{
        articleId: string;
        uid: string;
      }>('likeUsers', (ref) => ref.where('uid', '==', uid))
      .valueChanges()
      .pipe(
        map((result) => result.map((item) => item.articleId)),
        take(1)
      )
      .toPromise();
  }
}
