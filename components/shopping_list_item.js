import React, { Component } from 'react';
import { Text } from 'react-native';

export default class ShoppingListItem extends Component {
	render() {
		return (
			<Text>{this.props.item.name}</Text>
		);
	}
}