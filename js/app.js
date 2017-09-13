import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import ShoppingListAddScreen from './screens/shopping_list_add_screen';
import ShoppingListScreen from './screens/shopping_list_screen';
import ShoppingListsScreen from './screens/shopping_lists_screen';
import { db, remoteDb } from './db'
import { loadLists } from './actions/index'
import { ShoppingListFactory, ShoppingListRepositoryPouchDB } from 'ibm-shopping-list-model'

const store = createStore(reducers, applyMiddleware(thunk));

const ShoppingListNavigator = StackNavigator({
  ShoppingLists: { screen: ShoppingListsScreen },
  ShoppingList: { screen: ShoppingListScreen },
  ShoppingListAdd: { screen: ShoppingListAddScreen }
});

export default class ShoppingListApp extends Component  {
  constructor(props) {
    super(props);
    db.createIndex({
      index: {
        fields: ['type', 'list']
      }
    }).then(function (result) {
      db.sync(remoteDb, {
        live: true,
        retry: true
      }).on('change', (change) => {
        store.dispatch(loadLists());
      }).on('error', (err) => {
        console.log(err);
      });
      db.changes({
        since: 0,
        live: true
      }).on('change', (change) => {
        store.dispatch(loadLists());
      }).on('error', (err) => {
        console.log(err);
      });
    }).catch(function (err) {
      // ouch, an error
    });
  }

  render() {
    return (
      <Provider store={store}>
        <ShoppingListNavigator />
      </Provider>
    )
  }
}