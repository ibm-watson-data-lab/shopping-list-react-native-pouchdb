import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import ShoppingListItem from './shopping_list_item';
import ShoppingListItemAdd from './shopping_list_item_add';

class ShoppingListManage extends Component {

  constructor(props) {
    super(props);
   }

  renderFlatListItem(item) {
    return (
      <ShoppingListItem item={item} list={this.props.list} pouchdb={this.props.pouchdb} />
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.list.name}</Text>
        <FlatList
          data={this.props.list.items}
          renderItem={({ item }) => this.renderFlatListItem(item)}
          keyExtractor={item => item._id}
          extraData={this.props.list._rev}
        >
        </FlatList>
        <ShoppingListItemAdd list={this.props.list} pouchdb={this.props.pouchdb} onItemTextChanged={this.props.onItemTextChanged} onItemAdded={this.props.onItemAdded} />
      </View>
    );
  }
}

function mapStateToProps(state) {
	return {
    itemAdded: state.itemAdded,
    itemUpdated: state.itemUpdated,
    itemDeleted: state.itemDeleted
	};
}

export default connect(mapStateToProps)(ShoppingListManage);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  }
});