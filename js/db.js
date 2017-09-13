import PouchDB from 'pouchdb-browser';
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBAsyncStorageAdapter);
PouchDB.plugin(PouchDBFind);
const remoteDbUrl = "http://admin:pass@9.24.7.248:35984/testdb";
//const remoteDbUrl = "http://admin:pass@192.168.1.70:35984/testdb";
const remoteDb = new PouchDB(remoteDbUrl);
const db = new PouchDB('testdb', { adapter: 'asyncstorage' });

export { db, remoteDb }