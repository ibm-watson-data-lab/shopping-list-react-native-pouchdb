import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';

export default class ShoppingListItem extends Component {

  constructor(props) {
    super(props);
  }
  
  save(checked) {
    this.props.item.checked = checked;
    this.props.onItemCheckChanged(this.props.item, (err) => {
      if (err) {
        this.props.item.checked = ! checked;
      }
      this.setState({});
    });
  }

  render() {
    return (
      <View style={{flexDirection: 'row', padding: 10}}>
        <Switch value={this.props.item.checked} onValueChange={(checked) => this.save(checked)} />
        <Text style={{padding: 10}}>{this.props.item.name}</Text>
      </View>
    );
  }
}