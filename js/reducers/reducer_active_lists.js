import { ADD_LIST, DELETE_LIST, LOAD_LISTS } from '../actions/index'

export default function (state = null, action) {
  if (action) {
    switch (action.type) {
      case LOAD_LISTS:
        state = action.payload;
        break;
      case ADD_LIST:
        if (state) {
          state = Array.from(state);
          state.push(action.payload);
        }
        else {
          state = [action.payload];
        }
        break;
      case DELETE_LIST:
        if (state) {
          let index = -1;
          for (let i = state.length - 1; i >= 0; i--) {
            if (state[i].list._id == action.payload._id) {
              index = i;
              break;
            }
          }
          if (index != -1) {
            state.splice(index, 1);
            state = Array.from(state);
          }
        }
        break;
    }
  }
  return state;
}