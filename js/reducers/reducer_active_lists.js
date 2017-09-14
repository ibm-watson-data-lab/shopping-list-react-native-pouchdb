import { ADD_ITEM, ADD_LIST, DELETE_ITEM, DELETE_LIST, LOAD_LISTS, UPDATE_ITEM_CHECKED } from '../actions/index'

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
          for (let i = state.length - 1; i >= 0; i--) {
            if (state[i].list._id == action.payload._id) {
              state.splice(i, 1);
              state = Array.from(state);
              break;
            }
          }
        }
        break;
      case ADD_ITEM:
        for (let i = state.length - 1; i >= 0; i--) {
          if (state[i].list._id == action.payload.list) {
            if (state[i].items) {
              state[i].items = Array.from(state[i].items);
              state[i].items.push(action.payload);
              state[i].itemCount = state[i].items.length;
              state[i].itemCheckedCount = 0;
              for(let item of state[i].items) {
                  if (item.checked) {
                    state[i].itemCheckedCount++;
                  }
              }
              state = Array.from(state);
            }
            break;
          }
        }
        break;
      case DELETE_ITEM:
        for (let i = state.length - 1; i >= 0; i--) {
          if (state[i].list._id == action.payload.list) {
            if (state[i].items) {
              for(let j = state[i].items.length -1; j >=0; j--) {
                if (state[i].items[j]._id == action.payload._id) {
                  state[i].items = Array.from(state[i].items);
                  state[i].items.splice(j, 1);
                  state[i].itemCount = state[i].items.length;
                  state[i].itemCheckedCount = 0;
                  for(let item of state[i].items) {
                      if (item.checked) {
                        state[i].itemCheckedCount++;
                      }
                  }
                  state = Array.from(state);
                  break;
                }
              }
            }
            break;
          }
        }
        break;
      case UPDATE_ITEM_CHECKED:
        for (let i = state.length - 1; i >= 0; i--) {
          if (state[i].list._id == action.payload.list) {
            if (state[i].items) {
              for(let j = state[i].items.length -1; j >=0; j--) {
                if (state[i].items[j]._id == action.payload._id) {
                  state[i].items = Array.from(state[i].items);
                  state[i].items.splice(j, 1, action.payload);
                  state[i].itemCount = state[i].items.length;
                  state[i].itemCheckedCount = 0;
                  for(let item of state[i].items) {
                      if (item.checked) {
                        state[i].itemCheckedCount++;
                      }
                  }
                  state = Array.from(state);
                  break;
                }
              }
            }
            break;
          }
        }
        break;
    }
  }
  return state;
}