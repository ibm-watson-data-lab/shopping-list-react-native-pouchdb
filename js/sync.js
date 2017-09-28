import PouchDB from 'pouchdb-react-native';
import { setSyncUrl } from './actions/index';

export default class SyncManager {

  store = null;
  settingsDoc = null;
  settingsDB = null;
  shoppingListDB = null;
  activeSync = null;
  activeSyncUrl = null;
  onSyncComplete = null;
  onSyncError = null;

  constructor(store, settingsDB, shoppingListDB, onSyncComplete, onSyncError) {
    this.store = store;
    this.settingsDB = settingsDB;
    this.shoppingListDB = shoppingListDB;
    this.onSyncComplete = onSyncComplete;
    this.onSyncError = onSyncError;
    this.store.subscribe(() => this.onStateChanged());
    this.settingsDB.get('settings')
      .then((doc) => {
        this.settingsDoc = doc;
        if (this.settingsDoc) {
          this.store.dispatch(setSyncUrl(this.settingsDoc.syncUrl));
        }
      }).catch((err) => {
        // TODO:
        console.log(err);
      });
  }

  onStateChanged() {
    const state = this.store.getState();
    const newSyncUrl = state["syncUrl"];
    if (newSyncUrl != this.activeSyncUrl) {
      if (this.settingsDoc == null) {
        this.settingsDoc = {
          _id: 'settings',
          syncUrl: newSyncUrl
        }
      }
      this.settingsDB.put(this.settingsDoc)
        .then((response) => {
          this.settingsDoc._id = response.id;
          this.settingsDoc._rev = response.rev;
          this.updateSyncUrl(newSyncUrl);
        }).catch(function (err) {
          // TODO:
          console.log(err);
        });
    }
  }

  startSync() {
    if (this.activeSync) {
      this.activeSync.cancel()
      this.activeSync = null;
    }
    if (this.activeSyncUrl && this.activeSyncUrl.length > 0) {
      const remoteDb = new PouchDB(this.activeSyncUrl);
      this.activeSync = this.shoppingListDB.sync(remoteDb, {
        live: true,
        retry: true
      })
        .on('change', this.onSyncComplete)
        .on('error', this.onSyncError);
    }
  }

  updateSyncUrl(url) {
    if (url != this.activeSyncUrl) {
      this.activeSyncUrl = url;
      this.startSync();
    }
  }
}