import { SET_SYNC_URL } from '../actions/index'

export default function (state = null, action) {
  if (action) {
    switch (action.type) {
      case SET_SYNC_URL:
        state = action.payload;
        break;
    }
  }
  return state;
}