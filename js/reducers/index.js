import { combineReducers } from 'redux';
import ActiveListReducer from './reducer_active_list';
import LoadListsReducer from './reducer_load_lists';
import UpdateNewItemTextReducer from './reducer_update_new_item_text';

const rootReducer = combineReducers({
  activeList: ActiveListReducer,
  listsLoaded: LoadListsReducer,
  newItemText: UpdateNewItemTextReducer
});

export default rootReducer;