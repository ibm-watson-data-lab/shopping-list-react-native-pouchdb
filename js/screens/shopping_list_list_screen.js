import React, { Component } from 'react';
import ShoppingListList from '../components/shopping_list_list';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';

class ShoppingListListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Shopping Lists",
    headerRight: (
      <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('ShoppingListAdd')}>
        <Text style={{ fontSize: 22, color: '#FFFFFF' }}> + </Text>
      </TouchableHighlight>
    ),
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2',
      paddingRight: 10
    }
  });

  constructor(props) {
    super(props);
  }

  handleListPressed(list) {
    this.props.navigation.navigate('ShoppingList', {list: list});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ShoppingListList lists={this.props.lists} onListPressed={(list) => this.handleListPressed(list)} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.listsLoaded
  }
}

export default connect(mapStateToProps)(ShoppingListListScreen);