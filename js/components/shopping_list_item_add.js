import React, { Component } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItem, updateNewItemText } from '../actions/index';

class ShoppingListItemAdd extends Component {

  constructor(props) {
    super(props);
  }

  save() {
    this.props.addItem(this.props.text, this.props.listId);
    this.props.updateNewItemText('');
  }

  handleCheckBoxClick() {
    // do nothing - onClick is required
  }

  render() {
    let textInputStyles = [styles.textInput];
    if (Platform.OS === 'ios') {
      textInputStyles.push(styles.textInputiOS);
    }
    return (
      <View style={{flexDirection: 'row', padding: 10}}>
        <CheckBox
          checkBoxColor='#4A90E2'
          disabled={true}
          isChecked={false}
          onClick={()=>this.handleCheckBoxClick()}
        />
        <TextInput
          style={textInputStyles}
          onChangeText={(text) => this.props.updateNewItemText(text)}
          onSubmitEditing={() => this.save()}
          value={this.props.text}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingTop: 0,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FFFFFF'
  },
  textInputiOS: {
    borderColor: '#9C9C9C',
    borderBottomWidth: 1
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNewItemText: updateNewItemText,
    addItem: addItem 
  }, dispatch);
}

function mapStateToProps(state) {
	return {
		text: state.newItemText
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListItemAdd);