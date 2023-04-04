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
  console.log('PUT initiated');

  //create connection with jate
  const touchDb = await openDB('jate', 1);

  // new transaction of 'read and write' as our privilege
  const tx = touchDb.transaction('jate', 'readwrite');

  // Open desired obj store
  const store = tx.objectStore('jate');

  // put method to pass content
  const request = store.put({ id: 1, value: content});

  // confirm request
  const result = await request;

  // log for completion
  console.log('data saved.', result);
}

// adds logic for a method that gets all content in store from database to read only.
export const getDb = async () => {

  console.log('GET initiated');

  // connect to database
  const touchDb = await openDB('jate', 1);
  
  // give a 'read only' privilege
  const tx = touchDb.transaction('jate', 'readonly');

  // open desired obj store
  const store = tx.objectStore('jate');

  // getAll() method to retrieve all saved databases
  const request = store.getAll();

  // confirm the request
  const result = await request;

  // log the result
  console.log('result.value', result)
  // must return the value to update the editor every time it is open
  return result.value
};

initdb();
