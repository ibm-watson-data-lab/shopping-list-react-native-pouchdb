import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CheckBox from 'react-native-check-box'

export default class ShoppingListItemAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  save() {
    this.props.onItemAdded(this.state.text, (err) => {
      if (! err) {
        this.setState({text: ''});
      }
    });
  }

  handleCheckBoxClick() {
    // do nothing
  }

  handleChangeText(text) {
    this.props.onItemTextChanged(text);
    this.setState({ text: text });
  }

  render() {
    return (
      <View style={{flexDirection: 'row', padding: 10}}>
        <CheckBox
          checkBoxColor='#4A90E2'
          disabled={true}
          isChecked={false}
          onClick={()=>this.handleCheckBoxClick()}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.handleChangeText(text)}
          onSubmitEditing={() => this.save()}
          value={this.state.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#9C9C9C',
    borderBottomWidth: 1
  }
});