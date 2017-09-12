import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addItem, updateNewItemText } from '../actions/index';
import ShoppingListManage from '../components/shopping_list_manage';

class ShoppingListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.list.name,
    headerRight: <Button title='Done' color='#FFFFFF' onPress={() => navigation.state.params.onDonePressed()} />,
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2'
    }
  });

  constructor(props) {
    super(props);
  }

  handleDonePressed() {
    if (this.props.newItemText != '') {
      this.props.addItem(this.props.newItemText, this.props.navigation.state.params.list, this.props.navigation.state.params.pouchdb);
      this.props.updateNewItemText('');
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ text: '', buttonTitle: '', onDonePressed: () => this.handleDonePressed() })
  }

  // handleItemTextChanged(text) {
  //   let buttonTitle = text == '' ? '' : 'Done';
  //   this.props.navigation.setParams({ text: text, buttonTitle: buttonTitle, onDonePressed: () => this.handleDonePressed() })
  // }

  render() {
    console.log('RENDERING???');
    return (
      <ShoppingListManage list={this.props.navigation.state.params.list} pouchdb={this.props.navigation.state.params.pouchdb} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateNewItemText: updateNewItemText,
    addItem: addItem 
  }, dispatch);
}

function mapStateToProps(state) {
	return {
    newItemText: state.newItemText,
		itemAdded: state.itemAdded
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListScreen);