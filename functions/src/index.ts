import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export { addRecord, updateRecord, deleteRecord } from './algolia.function';
export { like, unLike } from './like.function';
