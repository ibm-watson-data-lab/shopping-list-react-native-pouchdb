import { combineReducers } from 'redux';
import ActiveListsReducer from './reducer_active_lists';
import ActiveListReducer from './reducer_active_list';
import UpdateNewItemTextReducer from './reducer_update_new_item_text';

const rootReducer = combineReducers({
  activeLists: ActiveListsReducer,
  activeList: ActiveListReducer,
  newItemText: UpdateNewItemTextReducer
});

export default rootReducer;