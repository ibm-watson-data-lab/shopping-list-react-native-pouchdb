import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteList } from '../actions/index';

class ShoppingList extends Component {

  delete() {
    this.props.deleteList(this.props.list);
  }

  render() {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#FF0000',
      onPress: () => { this.delete() }
    }];
    return (
      <Swipeout
        style={styles.swipeout}
        right={swipeBtns}
        autoClose={true}
        backgroundColor='transparent'
      >
        <TouchableHighlight underlayColor='transparent' style={styles.container} onPress={() => this.props.onListPressed(this.props.list)}>
          <View>
            <Text>{this.props.list.title}</Text>
            <Text>{`${this.props.itemCount} item(s)`}</Text>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  swipeout: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 0
  },
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteList: deleteList
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ShoppingList);