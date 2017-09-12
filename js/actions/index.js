export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const UPDATE_ITEM_CHECKED = 'UPDATE_ITEM_CHECKED';
export const UPDATE_NEW_ITEM_TEXT = 'UPDATE_NEW_ITEM_TEXT';

export function addList(text, pouchdb) {
  let list = {
    type: 'list',
    name: text,
  }
  return dispatch => {
    pouchdb.post(list)
      .then((response) => {
        dispatch({
          type: ADD_LIST,
          payload: list
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}

export function deleteList(list, pouchdb) {
  return dispatch => {
    pouchdb.remove(list)
      .then((response) => {
        dispatch({
          type: DELETE_LIST,
          payload: list._id
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}

export function updateNewItemText(text) {
  return {
    type: UPDATE_NEW_ITEM_TEXT,
    payload: text
  }
}

export function addItem(text, list, pouchdb) {
  if (!list.items) {
    list.items = [];
  }
  let item = {
    _id: `item${list.items.length}`,
    name: text,
    checked: false
  };
  list.items.push(item);
  return dispatch => {
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev;
        dispatch({
          type: ADD_ITEM,
          payload: list._rev
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}

export function updateItemChecked(item, list, pouchdb) {
  item.checked = ! item.checked;
  return dispatch => {
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev;
        console.log('DISPATCHING UPDATE_ITEM_CHECKED');
        dispatch({
          type: UPDATE_ITEM_CHECKED,
          payload: list._rev
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}

export function deleteItem(item, list, pouchdb) {
  if (! list.items) {
    return;
  }
  var index = list.items.indexOf(item);
  if (index > -1) {
    list.items.splice(index, 1);
  }
  return dispatch => {
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev;
        dispatch({
          type: DELETE_ITEM,
          payload: list._rev
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}