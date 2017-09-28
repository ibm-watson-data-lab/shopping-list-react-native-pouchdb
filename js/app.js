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
import SettingsScreen from './screens/settings_screen';
import { settingsDB, shoppingListDB } from './db'
import SyncManager from './sync'
import { loadLists } from './actions/index'

const store = createStore(reducers, applyMiddleware(thunk));

const ShoppingListNavigator = StackNavigator({
  ShoppingLists: { screen: ShoppingListsScreen },
  ShoppingList: { screen: ShoppingListScreen },
  ShoppingListAdd: { screen: ShoppingListAddScreen },
  Settings: { screen: SettingsScreen }
});

export default class ShoppingListApp extends Component  {

  syncManager = null;
  
  constructor(props) {
    super(props);
    // load all lists
    store.dispatch(loadLists());
    // create sync manager
    this.syncManager = new SyncManager(store, settingsDB, shoppingListDB, this.onSyncComplete, this.onSyncError);
  }

  onSyncComplete(change) {
    if (change.direction == 'pull') {
      store.dispatch(loadLists());
    }
  }

  onSyncError(error) {
    // TODO:
    console.log(err);
  }

  render() {
    return (
      <Provider store={store}>
        <ShoppingListNavigator />
      </Provider>
    )
  }
}