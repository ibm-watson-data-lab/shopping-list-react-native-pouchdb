import { shoppingListDB } from '../db'
import cuid from 'cuid';

export const SET_SYNC_URL = 'SET_SYNC_URL';
export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const LOAD_LISTS = 'LOAD_LISTS';
export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';
export const LOAD_ACTIVE_ITEMS = 'LOAD_ACTIVE_ITEMS';
export const UPDATE_ITEM_CHECKED = 'UPDATE_ITEM_CHECKED';
export const UPDATE_NEW_ITEM_TEXT = 'UPDATE_NEW_ITEM_TEXT';

export function setSyncUrl(url) {
  return {
    type: SET_SYNC_URL,
    payload: url
  };
}

export function loadLists() {
  return dispatch => {
    let lists = [];
    // to load all lists we have to use allDocs due to an issue in pouchdb/React Native:
    // https://github.com/pouchdb/pouchdb/issues/6584
    shoppingListDB.allDocs({include_docs: true})
      .then((result) => {
        // get lists
        for (let row of result.rows) {
          doc = row.doc;
          if (doc.type && doc.type == 'list') {
            lists.push({listId: doc._id, list: doc, itemCount: 0, itemCheckedCount: 0, items: []});
          }
        }
        // get items
        for (let row of result.rows) {
          doc = row.doc;
          if (doc.type && doc.type == 'item') {
            for (let list of lists) {
              if (doc.list == list.listId) {
                list.items.push(doc);
                list.itemCount = list.itemCount + 1;
                if (doc.checked) {
                  list.itemCheckedCount = list.itemCheckedCount + 1;
                }
                break;  
              }
            }
          }
        }
        dispatch({
          type: LOAD_LISTS,
          payload: lists
        });
      }).catch((err) => {
        // TODO:
        console.log(err);
      });
  };
}

export function setActiveList(list) {
  return {
    type: SET_ACTIVE_LIST,
    payload: list
  }
}

export function addList(title) {
  let createdAt = new Date().toISOString();
  let list = {
    _id: 'list:' + cuid(),
    type: 'list',
    version: 1,
    title: title,
    checked: false,
    createdAt: createdAt,
    updatedAt: createdAt
  };
  return dispatch => {
    shoppingListDB.put(list).then(result => {
      list._rev = result.rev;
      dispatch({
        type: ADD_LIST,
        payload: {list: list, itemCount: 0, itemCheckedCount: 0, items: []}
      });
    });
  };
}

export function deleteList(list) {
  return dispatch => {
    let originalList = list;
    shoppingListDB.get(list._id).then(list => {
      return shoppingListDB.remove(list);
    }).then(result => {
      dispatch({
        type: DELETE_LIST,
        payload: originalList
      });
    });
  };
}

export function loadActiveItems(listId) {
  return dispatch => {
    // to load active items we have to use allDocs due to an issue in pouchdb/React Native:
    // https://github.com/pouchdb/pouchdb/issues/6584
    shoppingListDB.allDocs({include_docs: true})
      .then((result) => {
        let items = [];
        for (let row of result.rows) {
          doc = row.doc;
          if (doc.type && doc.type == 'item' && doc.list == listId) {
            items.push(doc);
          }
        }
        dispatch({
          type: LOAD_ACTIVE_ITEMS,
          payload: items
        });
      }).catch((err) => {
        // TODO:
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

export function addItem(title, listId) {
  return dispatch => {
    let createdAt = new Date().toISOString();
    let item = {
      _id: 'item:' + cuid(),
      type: 'item',
      version: 1,
      list: listId,
      title: title,
      checked: false,
      createdAt: createdAt,
      updatedAt: createdAt
    };
    shoppingListDB.put(item).then(result => {
      item._rev = result.rev;
      dispatch({
        type: ADD_ITEM,
        payload: item
      });
    });
  };
}

export function updateItemChecked(item) {
  return dispatch => {
    let checked = ! item.checked;
    shoppingListDB.get(item._id).then(item => {
      item.checked = checked;
      item.updatedAt = new Date().toISOString();
      shoppingListDB.put(item).then(result => {
        item._rev = result.rev;
        dispatch({
          type: UPDATE_ITEM_CHECKED,
          payload: item
        });
      });
    }).catch(err => {
      // TODO:
      console.log(err);
    });
  };
}

export function deleteItem(item) {
  return dispatch => {
    let originalItem = item;
    shoppingListDB.get(item._id).then(item => {
      return shoppingListDB.remove(item);
    }).then(result => {
      console.log(result);
      console.log(originalItem);
      dispatch({
        type: DELETE_ITEM,
        payload: originalItem
      });
    });
  };
}