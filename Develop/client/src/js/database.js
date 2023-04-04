import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// adds logic to the 'put' method and adds it to database transaction as read and write.
export const putDb = async (content) => {
  console.log('PUT');

  const touchDb = await openDB('jate', 1);
  const text = touchDb.transaction('jate', 'readwrite');
  const store = text.objectStore('jate');
  const request = store.put({ id: 1, value: content});

  const result = await request;

  console.log('data saved.', result);
}

// adds logic for a method that gets all content in store from database to read only.
export const getDb = async () => {

  console.log('GET');

  const touchDb = await openDB('jate', 1);
  const text = touchDb.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request = store.getAll();

  const result = await request;

  console.log('result.value', result)

  return result?.value
};

initdb();
