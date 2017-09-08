import React, { Component } from 'react';
import { FlatList, List, ListItem, Text } from 'react-native';

export default class ShoppingListList extends Component {
	constructor(props) {
	  super(props);
	  this.state = {lists: [{id: '1', name: 'List 1', items: []}, {id: '2', name: 'List 2', items: []}]};
	}
  
	render() {
	  return (
			
			<FlatList
				data={this.state.lists}
				renderItem={({item}) => <Text>{item.name}</Text>}
				keyExtractor={item => item.id}
			>
			</FlatList>
	  );
	}
}