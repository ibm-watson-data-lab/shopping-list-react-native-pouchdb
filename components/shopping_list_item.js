import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class ShoppingListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {item: this.props.item};
  }

  componentWillReceiveProps(props) {
    this.setState({item: props.item});  
  }
  
  save(checked) {
    this.state.item.checked = checked;
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
    let child = (
      <View style={{flexDirection: 'row', padding: 10}}>
        <Switch value={this.state.item.checked} onValueChange={(checked) => this.save(checked)} />
        <Text style={{padding: 10}}>{this.state.item.name}</Text>
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