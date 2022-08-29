// db.js
import Dexie from 'dexie';

export const db: any = new Dexie('myDatabase');
db.version(1).stores({
  ShopList: '++id, title, state, createTime, memo, schema',
});