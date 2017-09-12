import React, { Component } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import ShoppingList from './shopping_list';

export default class ShoppingListList extends Component {

  constructor(props) {
    super(props);
  }

  renderFlatListItem(list) {
    return (
      <ShoppingList
        list={list}
        pouchdb={this.props.pouchdb}
        onListPressed={this.props.onListPressed}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList style={{flex: 1}}
          data={this.props.docs}
          renderItem={({ item }) => this.renderFlatListItem(item)}
          keyExtractor={item => item._id}
        >
        </FlatList>
      </View>
    );
  }
}