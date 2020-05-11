import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Article } from './../interfaces/article';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private db: AngularFirestore) {}

  getArticle(id: string): Observable<Article> {
    return this.db.doc<Article>(`articles/${id}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db.collection<Article>('articles').valueChanges();
  }

  deleteArticle(id: string): Promise<void> {
    return this.db.doc<Article>(`articles/${id}`).delete();
  }

  updateArticle(article: Article): Promise<void> {
    return this.db.doc<Article>(`articles/${article.id}`).update(article);
  }

  createArticle(article: Omit<Article, 'id' | 'createdAt'>): Promise<void> {
    const id = this.db.createId();

    return this.db.doc(`articles/${id}`).set({
      id,
      createdAt: firestore.Timestamp.now(),
      likeCount: 0,
      ...article,
    });
  }

  likeArticle(articleId: string): Promise<void> {
    const uid = 'AAA';
    return this.db.doc(`articles/${articleId}/likeUsers/${uid}`).set({
      articleId,
      uid,
    });
  }

  unLikeArticle(id: string): Promise<void> {
    const uid = 'AAA';
    return this.db.doc(`articles/${id}/likeUsers/${uid}`).delete();
  }
}
