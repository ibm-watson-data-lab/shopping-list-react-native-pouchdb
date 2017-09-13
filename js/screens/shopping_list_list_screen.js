import React, { Component } from 'react';
import ShoppingListList from '../components/shopping_list_list';
import { Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

class ShoppingListListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Shopping Lists",
    headerRight: <Button title='+' color='#FFFFFF' onPress={() => navigation.navigate('ShoppingListAdd')} />,
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2'
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