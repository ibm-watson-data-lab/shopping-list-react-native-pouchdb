import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default class ShoppingListAddScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "New Shopping List",
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
    navigation.state.params.pouchdb.post({
      type: 'list',
      name: navigation.state.params.text,
    }).then((response) => {
      navigation.goBack();
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: this.save, text: '' });
  }

  render() {
    return (
      <TextInput
        style={styles.container}
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