import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default class ShoppingListItemAddScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "New Item",
    headerRight: <Button title="Save" onPress={() => navigation.state.params.save(navigation)} />
  });

  constructor(props) {
    super(props);
  }

  save(navigation) {
    let shopping_list = navigation.state.params.list;
    if (!shopping_list.items) {
      shopping_list.items = [];
    }
    shopping_list.items.push({
      _id: `item${shopping_list.items.length}`,
      name: navigation.state.params.text
    });
    navigation.state.params.pouchdb.put(shopping_list)
      .then(function (response) {
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
    borderColor: 'gray',
    borderWidth: 1
  }
});