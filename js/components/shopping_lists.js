import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import ShoppingList from './shopping_list';

export default class ShoppingLists extends Component {

  constructor(props) {
    super(props);
  }

  renderFlatListItem(list) {
    return (
      <ShoppingList
        list={list.list}
        itemCount={list.itemCount}
        onListPressed={this.props.onListPressed}
      />
    );
  }

  render() {
    if (! this.props.lists) {
      return (
        <ActivityIndicator style={styles.container} animating={true} />
      );
    }
    else if (this.props.lists.length == 0) {
      return (
        <View style={styles.container}>
          <Text>No lists, yet!</Text>
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <FlatList style={{ flex: 1 }}
            data={this.props.lists}
            renderItem={({ item }) => this.renderFlatListItem(item)}
            keyExtractor={item => item.list._rev}
          >
          </FlatList>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    alignItems: 'center'
  }
});