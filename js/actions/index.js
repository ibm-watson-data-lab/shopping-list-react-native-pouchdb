import uuid from 'react-native-uuid';
import { db } from '../db'

export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const LOAD_LISTS = 'LOAD_LISTS';
export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';
export const LOAD_ACTIVE_ITEMS = 'LOAD_ACTIVE_ITEMS';
export const UPDATE_ITEM_CHECKED = 'UPDATE_ITEM_CHECKED';
export const UPDATE_NEW_ITEM_TEXT = 'UPDATE_NEW_ITEM_TEXT';

export function loadLists() {
  return dispatch => {
    let lists = [];
    db.find({selector: {type: 'list'}})
      .then((result) => {
        for (let doc of result.docs) {
          lists.push({listId: doc._id, list: doc, itemCount: 0, items: []});
        }
        return db.find({selector: {type: 'item'}})
      }).then((result) => {
        for (let doc of result.docs) {
          for (let list of lists) {
            if (doc.list == list.listId) {
              list.items.push(doc);
              list.itemCount = list.itemCount + 1;
              break;  
            }
          }
        }
        dispatch({
          type: LOAD_LISTS,
          payload: lists
        });
      }).catch((err) => {
        // todo
      });
  };
}

export function setActiveList(list) {
  return {
    type: SET_ACTIVE_LIST,
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

export function loadActiveItems(listId) {
  return dispatch => {
    db.find({selector: {type: 'item', list: listId}})
      .then((result) => {
        items = [];
        for (let doc of result.docs) {
            items.push(doc);
        }
        dispatch({
          type: LOAD_ACTIVE_ITEMS,
          payload: items
        });
      }).catch((err) => {
      // todo
    });
  };
}

export function updateNewItemText(text) {
  return {
    type: UPDATE_NEW_ITEM_TEXT,
    payload: text
  }
}

export function addItem(text, listId) {
  let item = {
    _id: uuid.v4(),
    type: 'item',
    version: 1,
    list: listId,
    title: text,
    checked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  return dispatch => {
    db.put(item)
      .then((response) => {
        item._rev = response.rev;
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

export function updateItemChecked(item) {
  item.checked = ! item.checked;
  item.updatedAt = new Date().toISOString();
  return dispatch => {
    db.put(item)
      .then((response) => {
        item._rev = response.rev;
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

export function deleteItem(item) {
  return dispatch => {
    db.remove(item)
      .then((response) => {
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