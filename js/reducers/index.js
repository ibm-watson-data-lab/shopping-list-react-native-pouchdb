import { combineReducers } from 'redux';
import AddItemReducer from './reducer_add_item';
import DeleteItemReducer from './reducer_delete_item';
import UpdateItemCheckedReducer from './reducer_update_item_checked';
import UpdateNewItemTextReducer from './reducer_update_new_item_text';

const rootReducer = combineReducers({
  newItemText: UpdateNewItemTextReducer,
  itemAdded: AddItemReducer,
  itemUpdated: UpdateItemCheckedReducer,
  itemDeleted: DeleteItemReducer
});

export default rootReducer;