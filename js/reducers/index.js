import { combineReducers } from 'redux';
import AddItemReducer from './reducer_add_item';
import AddListReducer from './reducer_add_list';
import CurrentListReducer from './reducer_current_list';
import DeleteItemReducer from './reducer_delete_item';
import LoadListsReducer from './reducer_load_lists';
import UpdateItemCheckedReducer from './reducer_update_item_checked';
import UpdateNewItemTextReducer from './reducer_update_new_item_text';

const rootReducer = combineReducers({
  newItemText: UpdateNewItemTextReducer,
  itemAdded: AddItemReducer,
  itemUpdated: UpdateItemCheckedReducer,
  itemDeleted: DeleteItemReducer,
  listAdded: AddListReducer,
  listsLoaded: LoadListsReducer,
  currentList: CurrentListReducer
});

export default rootReducer;