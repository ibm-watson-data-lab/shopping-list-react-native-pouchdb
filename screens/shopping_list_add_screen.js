import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default class ShoppingListAddScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "New Shopping List",
    headerRight: <Button title="Save" onPress={() => navigation.state.params.save(navigation)} />
  });

  constructor(props) {
    super(props);
  }

  save(navigation) {
    navigation.state.params.pouchdb.post({
      type: 'list',
      name: navigation.state.params.text,
    }).then(function (response) {
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