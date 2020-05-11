import * as functions from 'firebase-functions';
const algoliasearch = require('algoliasearch');
import * as admin from 'firebase-admin';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('articles');

export const addRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onCreate((snap, context) => {
    const data = snap.data() as {
      id: string;
      title: string;
      body: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
      tags: string[];
    };

    const item = {
      ...data,
      objectID: data.id,
      createdAt: data.createdAt.toMillis(),
      tags: data.tags,
    };

    return index.saveObject(item);
  });

export const updateRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onUpdate((snap, context) => {
    const data = snap.after.data() as {
      id: string;
      title: string;
      body: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
      tags: string[];
    };

    const item = {
      ...data,
      objectID: data.id,
      tags: data.tags,
    };

    return index.saveObject(item);
  });

export const deleteRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onDelete((snap, context) => {
    const data = snap.data() as {
      id: string;
      title: string;
      body: string;
      public: boolean;
      createdAt: admin.firestore.Timestamp;
      tags: string[];
    };

    return index.deleteObject(data.id);
  });
