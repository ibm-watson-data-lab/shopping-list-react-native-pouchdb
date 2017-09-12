import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import ShoppingListItem from './shopping_list_item';

export default class ShoppingList extends Component {

  renderFlatListItem(item) {
    return (
      <ShoppingListItem item={item} onItemCheckChanged={this.props.onItemCheckChanged}/>
    );
  }

  render() {
    return (
      <TouchableHighlight style={styles.container} onPress={() => this.props.onListPressed(this.props.list)}>
        <View>
          <Text>{this.props.list.name}</Text>
          <FlatList
            data={this.props.list.items}
            renderItem={({ item }) => this.renderFlatListItem(item)}
            keyExtractor={item => item._id}
          >
          </FlatList>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#0000CC'
  }
});