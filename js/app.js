import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import ShoppingListAddScreen from './screens/shopping_list_add_screen';
import ShoppingListListScreen from './screens/shopping_list_list_screen';
import ShoppingListScreen from './screens/shopping_list_screen';
import { db, remoteDb } from './db'
import { loadLists } from './actions/index'

const store = createStore(reducers, applyMiddleware(thunk));

const ShoppingListNavigator = StackNavigator({
  ShoppingListList: { screen: ShoppingListListScreen },
  ShoppingListAdd: { screen: ShoppingListAddScreen },
  ShoppingList: { screen: ShoppingListScreen }
});

export default class ShoppingListApp extends Component  {
  constructor(props) {
    super(props);
    console.log(db);
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
  }

  render() {
    return (
      <Provider store={store}>
        <ShoppingListNavigator />
      </Provider>
    )
  }
}