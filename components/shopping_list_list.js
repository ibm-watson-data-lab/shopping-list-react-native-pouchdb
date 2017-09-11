import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ShoppingList from './shopping_list';

export default class ShoppingListList extends Component {

  renderFlatListItem(item) {
    return (
      <ShoppingList list={item} onListPressed={this.props.onListPressed} />
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.props.docs}
        renderItem={({ item }) => this.renderFlatListItem(item)}
        keyExtractor={item => item._id}
      >
      </FlatList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF00FF'
  }
});