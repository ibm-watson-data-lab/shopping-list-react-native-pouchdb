import React, { Component } from 'react';
import ShoppingListAddScreen from './screens/shopping_list_add_screen';
import ShoppingListItemAddScreen from './screens/shopping_list_item_add_screen';
import ShoppingListListScreen from './screens/shopping_list_list_screen';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

const ShoppingListApp = StackNavigator({
  ShoppingListList: { screen: ShoppingListListScreen },
  ShoppingListAdd: { screen: ShoppingListAddScreen },
  ShoppingListItemAdd: { screen: ShoppingListItemAddScreen }
});

AppRegistry.registerComponent('ShoppingList', () => ShoppingListApp);
