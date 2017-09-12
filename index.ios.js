import React, { Component } from 'react';
import ShoppingListAddScreen from './screens/shopping_list_add_screen';
import ShoppingListListScreen from './screens/shopping_list_list_screen';
import ShoppingListScreen from './screens/shopping_list_screen';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

const ShoppingListApp = StackNavigator({
  ShoppingListList: { screen: ShoppingListListScreen },
  ShoppingListAdd: { screen: ShoppingListAddScreen },
  ShoppingList: { screen: ShoppingListScreen }
});

AppRegistry.registerComponent('ShoppingList', () => ShoppingListApp);