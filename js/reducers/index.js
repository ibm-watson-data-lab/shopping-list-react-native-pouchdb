import { combineReducers } from 'redux';
import ActiveListsReducer from './reducer_active_lists';
import ActiveListReducer from './reducer_active_list';
import SetSyncUrlReducer from './reducer_set_sync_url';
import UpdateNewItemTextReducer from './reducer_update_new_item_text';

const rootReducer = combineReducers({
  activeLists: ActiveListsReducer,
  activeList: ActiveListReducer,
  newItemText: UpdateNewItemTextReducer,
  syncUrl: SetSyncUrlReducer
});

export default rootReducer;