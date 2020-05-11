import { firestore } from 'firebase';

export interface Article {
  id: string;
  title: string;
  body: string;
  public: boolean;
  likeCount: number;
  createdAt: firestore.Timestamp;
  tags: string[];
}
