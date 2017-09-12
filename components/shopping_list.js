import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class ShoppingList extends Component {

  render() {
    let len = this.props.list.items ? this.props.list.items.length : 0;
    return (
      <TouchableHighlight underlayColor='transparent' style={styles.container} onPress={() => this.props.onListPressed(this.props.list)}>
        <View>
          <Text>{this.props.list.name}</Text>
          <Text>{`${len} item(s)`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  }
});