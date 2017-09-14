import { UPDATE_NEW_ITEM_TEXT } from '../actions/index'

export default function (state = null, action) {
  if (action) {
    switch (action.type) {
      case UPDATE_NEW_ITEM_TEXT:
        state = action.payload;
        break;
    }
  }
  return state;
}