import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default class ShoppingListItemAddScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "New Item",
    headerRight: <Button title='Save' color='#FFFFFF' onPress={() => navigation.state.params.save(navigation)} />,
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2'
    }
  });

  constructor(props) {
    super(props);
  }

  save(navigation) {
    let pouchdb = navigation.state.params.pouchdb;
    let list = navigation.state.params.list;
    let text = navigation.state.params.text;
    if (!list.items) {
      list.items = [];
    }
    list.items.push({
      _id: `item${list.items.length}`,
      name: text,
      checked: false
    });
    pouchdb.put(list)
      .then(function (response) {
        list._rev = response.rev;
        navigation.state.params.onItemAdded();
        navigation.goBack();
      }).catch(function (err) {
        console.log(err);
      });
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: this.save, text: '' });
  }

  render() {
    return (
      <TextInput style={styles.container}
        onChangeText={(text) => this.props.navigation.setParams({ text: text })}
        value={this.props.navigation.state.params.text}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: 40,
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  }
});