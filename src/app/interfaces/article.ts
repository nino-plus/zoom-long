import { firestore } from 'firebase';

export interface Article {
  id: string;
  title: string;
  body: string;
  public: boolean;
  createdAt: firestore.Timestamp;
}
