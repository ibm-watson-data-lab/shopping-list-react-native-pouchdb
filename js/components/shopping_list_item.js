import React, { Component } from 'react';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box'
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteItem, updateItemChecked } from '../actions/index';

class ShoppingListItem extends Component {

  constructor(props) {
    super(props);
  }
  
  update() {
    this.props.updateItemChecked(this.props.item, this.props.list);
  }

  delete() {
    this.props.deleteItem(this.props.item, this.props.list);
  }

  render() {
    let textDecorationLine = this.props.item.checked ? 'line-through': 'none';
    let textColor = this.props.item.checked ? '#9E9E9E': '#000000';
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: '#FF0000',
      onPress: () => { this.delete() }
    }];
    return (
      <Swipeout
        right={swipeBtns}
        autoClose={true}
        backgroundColor='transparent'
      >
        <View style={{flexDirection: 'row', padding: 10}}>
          <CheckBox
            style={{flex: 1}}
            checkBoxColor='#4A90E2'
            onClick={()=>this.update()}
            isChecked={this.props.item.checked}
            rightText={this.props.item.title}
            rightTextStyle={{textDecorationLine: textDecorationLine, color: textColor}}
          />
        </View>
      </Swipeout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteItem: deleteItem,
    updateItemChecked: updateItemChecked
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ShoppingListItem);