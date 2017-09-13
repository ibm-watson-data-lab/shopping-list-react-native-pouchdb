import { combineReducers } from 'redux';
import CurrentListReducer from './reducer_current_list';
import LoadListsReducer from './reducer_load_lists';
import UpdateNewItemTextReducer from './reducer_update_new_item_text';

const rootReducer = combineReducers({
  newItemText: UpdateNewItemTextReducer,
  listsLoaded: LoadListsReducer,
  currentList: CurrentListReducer
});

export default rootReducer;