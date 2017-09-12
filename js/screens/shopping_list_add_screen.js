import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addList } from '../actions/index';

class ShoppingListAddScreen extends Component {

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
    this.props.addList(navigation.state.params.text, navigation.state.params.pouchdb);
    // mw:TODO - this should probably happen after the save is successful
    navigation.goBack();
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: (navigation) => this.save(navigation), text: '' });
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addList: addList
  }, dispatch);
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListAddScreen);