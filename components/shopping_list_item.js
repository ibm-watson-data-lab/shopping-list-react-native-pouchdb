import React, { Component } from 'react';
import { View } from 'react-native';
import CheckBox from 'react-native-check-box'
import Swipeout from 'react-native-swipeout';

export default class ShoppingListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {item: this.props.item};
  }

  componentWillReceiveProps(props) {
    this.setState({item: props.item});  
  }
  
  save() {
    this.state.item.checked = ! this.state.item.checked;
    this.props.onItemCheckChanged(this.state.item, (err) => {
      if (err) {
        this.state.item.checked = ! checked;
      }
      this.setState({item: this.state.item});
    });
  }

  delete() {
    this.props.onItemDeleted(this.state.item, (err) => {
      if (err) {
        // mw:TODO
      }
      //this.setState({});
    });
  }

  render() {
    let textDecorationLine = this.state.item.checked ? 'line-through': 'none';
    let textColor = this.state.item.checked ? '#9E9E9E': '#000000';
    let child = (
      <View style={{flexDirection: 'row', padding: 10}}>
        <CheckBox
          style={{flex: 1}}
          checkBoxColor='#4A90E2'
          onClick={()=>this.save()}
          isChecked={this.state.item.checked}
          rightText={this.state.item.name}
          rightTextStyle={{textDecorationLine: textDecorationLine, color: textColor}}
        />
      </View>
    );
    if (this.props.onItemDeleted) {
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
          {child}
        </Swipeout>
      );
    }
    else {
      return child;
    }
  }
}