import React, { Component } from 'react';
import ShoppingListAddScreen from './screens/shopping_list_add_screen';
import ShoppingListListScreen from './screens/shopping_list_list_screen';
import ShoppingListScreen from './screens/shopping_list_screen';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const ShoppingListNavigator = StackNavigator({
  ShoppingListList: { screen: ShoppingListListScreen },
  ShoppingListAdd: { screen: ShoppingListAddScreen },
  ShoppingList: { screen: ShoppingListScreen }
});

export default class ShoppingListApp extends Component  {
  render() {
    return (
      <Provider store={store}>
        <ShoppingListNavigator />
      </Provider>
    )
  }
}