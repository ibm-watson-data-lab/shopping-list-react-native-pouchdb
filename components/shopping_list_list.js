import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ShoppingList from './shopping_list';

export default class ShoppingListList extends Component {

  constructor(props) {
    super(props);
    this.state = {docs: props.docs};
  }

  componentWillReceiveProps(props) {
    this.setState({docs: props.docs});  
  }

  renderFlatListItem(list) {
    return (
      <ShoppingList
        list={list}
        onListPressed={this.props.onListPressed}
        onItemCheckChanged={(item, checked, callback) => this.props.onItemCheckChanged(list, checked, callback)}/>
    );
  }

  render() {
    return (
      <FlatList style={styles.container}
        data={this.state.docs}
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