import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import ShoppingListItem from './shopping_list_item';

export default class ShoppingList extends Component {

  constructor(props) {
    super(props);
    this.state = {list: props.list};
  }

  componentWillReceiveProps(props) {
    this.setState({list: props.list});
  }

  renderFlatListItem(item) {
    return (
      <ShoppingListItem item={item} onItemCheckChanged={this.props.onItemCheckChanged} onItemDeleted={this.props.onItemDeleted}/>
    );
  }

  
  render() {
    let child = (
      <View>
        <Text>{this.state.list.name}</Text>
        <FlatList
          data={this.state.list.items}
          renderItem={({ item }) => this.renderFlatListItem(item)}
          keyExtractor={item => item._id}
        >
        </FlatList>
      </View>
    );
    if (this.props.onListPressed) {
      return (
        <TouchableHighlight style={styles.container} onPress={() => this.props.onListPressed(this.state.list)}>
          {child}
        </TouchableHighlight>
      );
    }
    else {
      return (
        <View style={styles.container}>
          {child}
        </View>
      );
    }
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