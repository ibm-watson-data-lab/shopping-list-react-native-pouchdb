import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSyncUrl } from '../actions/index';

class SettingsScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Settings",
    headerRight: (
      <TouchableHighlight underlayColor='transparent' onPress={() => navigation.state.params.save(navigation)}>
        <Text style={{ fontSize: 17, color: '#FFFFFF' }}>Save</Text>
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

  save(navigation) {
    this.props.setSyncUrl(navigation.state.params.text);
    // mw:TODO - this should probably happen after the save is successful
    navigation.goBack();
  }

  componentDidMount() {
    this.props.navigation.setParams({ save: (navigation) => this.save(navigation), text: this.props.syncUrl });
  }

  render() {
    let text = '';
    if (this.props.navigation && this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.text) {
      text = this.props.navigation.state.params.text;
    }
    return (
      <TextInput
        style={styles.container}
        onChangeText={(text) => this.props.navigation.setParams({ text: text })}
        value={text}
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

function mapStateToProps(state) {
  return {
    syncUrl: state.syncUrl
	};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSyncUrl: setSyncUrl
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);