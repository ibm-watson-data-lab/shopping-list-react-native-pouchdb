import PouchDB from 'pouchdb-react-native';
import PouchDBFind from 'pouchdb-find';
import { ShoppingListFactory, ShoppingListRepositoryPouchDB } from 'ibm-shopping-list-model';

global.navigator.mimeTypes = ''; //browser-fingerprint only checks the length property so an empty string is fine
global.navigator.userAgent = 'reactnative';    

PouchDB.plugin(PouchDBFind);
const settingsDB = new PouchDB('settings', { adapter: 'asyncstorage' });
const shoppingListDB = new PouchDB('shopping-list', { adapter: 'asyncstorage' });
const shoppingListFactory = new ShoppingListFactory(); 
const shoppingListRepository = new ShoppingListRepositoryPouchDB(shoppingListDB);

export { settingsDB, shoppingListDB, shoppingListFactory, shoppingListRepository }