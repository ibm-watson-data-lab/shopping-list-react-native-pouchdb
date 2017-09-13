import uuid from 'react-native-uuid';
import { db } from '../db'

export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const LOAD_LISTS = 'LOAD_LISTS';
export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
export const UPDATE_ITEM_CHECKED = 'UPDATE_ITEM_CHECKED';
export const UPDATE_NEW_ITEM_TEXT = 'UPDATE_NEW_ITEM_TEXT';

export function loadLists() {
  return dispatch => {
    db.allDocs({ include_docs: true }, (err, body) => {
      if (err || !body.rows) {
        // handle error
      }
      else {
        lists = [];
        for (let row of body.rows) {
          lists.push(row.doc);
        }
        dispatch({
          type: LOAD_LISTS,
          payload: lists
        });
      }
    });
  };
}

export function setCurrentList(list) {
  return {
    type: SET_CURRENT_LIST,
    payload: list
  }
}

export function addList(text) {
  let list = {
    type: 'list',
    version: 1,
    title: text,
    checked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  return dispatch => {
    db.post(list)
      .then((response) => {
        list._rev = response.rev;
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

export function deleteList(list) {
  return dispatch => {
    db.remove(list)
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

export function addItem(text, list) {
  if (!list.items) {
    list.items = [];
  }
  let item = {
    _id: uuid.v4(),
    name: text,
    checked: false
  };
  list.items.push(item);
  list.updatedAt = new Date().toISOString();
  return dispatch => {
    db.put(list)
      .then((response) => {
        list._rev = response.rev;
        dispatch({
          type: ADD_ITEM,
          payload: item
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}

export function updateItemChecked(item, list) {
  item.checked = ! item.checked;
  list.updatedAt = new Date().toISOString();
  return dispatch => {
    db.put(list)
      .then((response) => {
        list._rev = response.rev;
        dispatch({
          type: UPDATE_ITEM_CHECKED,
          payload: item
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}

export function deleteItem(item, list) {
  if (! list.items) {
    return;
  }
  var index = list.items.indexOf(item);
  if (index > -1) {
    list.items.splice(index, 1);
  }
  list.updatedAt = new Date().toISOString();
  return dispatch => {
    db.put(list)
      .then((response) => {
        list._rev = response.rev;
        dispatch({
          type: DELETE_ITEM,
          payload: item
        });
      }).catch((err) => {
        // mw:TODO
        console.log(err);
      });
  };
}