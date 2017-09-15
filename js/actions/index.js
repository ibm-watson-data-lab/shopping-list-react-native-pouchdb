import { db, shoppingListFactory, shoppingListRepository } from '../db'

export const ADD_LIST = 'ADD_LIST';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const DELETE_LIST = 'DELETE_LIST';
export const LOAD_LISTS = 'LOAD_LISTS';
export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';
export const LOAD_ACTIVE_ITEMS = 'LOAD_ACTIVE_ITEMS';
export const UPDATE_ITEM_CHECKED = 'UPDATE_ITEM_CHECKED';
export const UPDATE_NEW_ITEM_TEXT = 'UPDATE_NEW_ITEM_TEXT';

// export function loadLists() {
//   return dispatch => {
//     let lists = [];
//     let listItemPromises = [];
//     shoppingListRepository.find()
//       .then((allLists) => {
//         for (let list of allLists) {
//           lists.push({listId: list._id, list: list, itemCount: 0, itemCheckedCount: 0, items: []});
//           listItemPromises.push(shoppingListRepository.findItems({
//             selector: {
//               type: 'item',
//               list: list._id
//             }
//           }));
//         }
//         return Promise.all(listItemPromises);
//       })
//       .then((itemLists) => {
//         for (let itemList of itemLists) {
//           const itemArray = itemList.toArray();
//           for (let item of itemArray) {
//             for (let list of lists) {
//               if (item.list == list.listId) {
//                 list.items.push(item);
//                 list.itemCount = list.itemCount + 1;
//                 if (item.checked) {
//                   list.itemCheckedCount = list.itemCheckedCount + 1;
//                 }
//                 break;
//               }
//             }
//           }
//         }
//         dispatch({
//           type: LOAD_LISTS,
//           payload: lists
//         });
//       }).catch((err) => {
//         // TODO:
//         console.log(err);
//       });
//   };
// }

export function loadLists() {
  return dispatch => {
    let lists = [];
    // to load all lists we have to use allDocs due to an issue in pouchdb/React Native:
    // https://github.com/pouchdb/pouchdb/issues/6584
    db.allDocs({include_docs: true})
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
export function addList(text) {
  let list = shoppingListFactory.newShoppingList({
    title: text
  });
  return dispatch => {
    shoppingListRepository.post(list).then(list => {
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
    shoppingListRepository.get(list._id).then(list => {
      return shoppingListRepository.delete(list);
    }).then(list => {
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
    db.allDocs({include_docs: true})
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

// export function loadActiveItems(listId) {
//   return dispatch => {
//     shoppingListRepository.findItems({
//       selector: {
//         type: 'item',
//         list: listId
//       }
//     })
//       .then((items) => {
//         dispatch({
//           type: LOAD_ACTIVE_ITEMS,
//           payload: items.toArray()
//         });
//       }).catch((err) => {
//         // TODO:
//         console.log(err);
//       });
//   };
// }

export function updateNewItemText(text) {
  return {
    type: UPDATE_NEW_ITEM_TEXT,
    payload: text
  }
}

export function addItem(text, listId) {
  return dispatch => {
    shoppingListRepository.get(listId)
      .then(list => {
        let item = shoppingListFactory.newShoppingListItem({title: text}, list);
        return shoppingListRepository.postItem(item);
      }).then(item => {
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
    shoppingListRepository.getItem(item._id).then(item => {
      item = item.set('checked', checked);
      return shoppingListRepository.putItem(item);
    }).then(item => {
      dispatch({
        type: UPDATE_ITEM_CHECKED,
        payload: item
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
    shoppingListRepository.getItem(originalItem._id).then(item => {
      return shoppingListRepository.deleteItem(item);
    }).then(item => {
      dispatch({
        type: DELETE_ITEM,
        payload: originalItem
      });
    });
  };
}