import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { shouldEventRun, markEventTried } from './util';

export const like = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likeUsers/{uid}')
  .onCreate((snap, context) => {
    const eventId = context.eventId;
    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await admin
          .firestore()
          .doc(`articles/${context.params.articleId}`)
          .update('likeCount', admin.firestore.FieldValue.increment(1));
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });

export const unLike = functions
  .region('asia-northeast1')
  .firestore.document('articles/{articleId}/likeUsers/{uid}')
  .onDelete((snap, context) => {
    const eventId = context.eventId;

    return shouldEventRun(eventId).then(async (should: boolean) => {
      if (should) {
        await admin
          .firestore()
          .doc(`articles/${context.params.articleId}`)
          .update('likeCount', admin.firestore.FieldValue.increment(-1));
        return markEventTried(eventId);
      } else {
        return true;
      }
    });
  });
