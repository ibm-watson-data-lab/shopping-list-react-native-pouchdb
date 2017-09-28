import PouchDB from 'pouchdb-react-native';

// these settings let us use cuids
// see: https://github.com/ericelliott/cuid/issues/54
global.navigator.mimeTypes = '';
global.navigator.userAgent = 'reactnative';    

const settingsDB = new PouchDB('settings', { adapter: 'asyncstorage' });
const shoppingListDB = new PouchDB('shopping-list', { adapter: 'asyncstorage' });

export { settingsDB, shoppingListDB }