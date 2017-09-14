import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShoppingListItem from './shopping_list_item';
import ShoppingListItemAdd from './shopping_list_item_add';
import { loadActiveItems, setActiveList } from '../actions/index'

class ShoppingListManage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setActiveList(this.props.list);
    this.props.loadActiveItems(this.props.list._id);
  }

  renderFlatListItem(item) {
    return (
      <ShoppingListItem item={item} />
    );
  }
  
  render() {
    let list = this.props.list;
    let items = [];
    let deleted = false;
    if (this.props.activeList) {
      list = this.props.activeList.list;
      items = this.props.activeList.items;
      deleted = this.props.activeList.deleted;
    }
    if (deleted) {
      return (
        <View style={styles.container}>
          <Text>This list has been deleted.</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text>{list.title}</Text>
          <FlatList
            data={items}
            renderItem={({ item }) => this.renderFlatListItem(item)}
            keyExtractor={item => item._rev}
          >
          </FlatList>
          <ShoppingListItemAdd listId={list._id} />
        </View>
      );
    }
  }
}

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setActiveList: setActiveList,
    loadActiveItems: loadActiveItems
  }, dispatch);
}

function mapStateToProps(state) {
	return {
    activeList: state.activeList
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingListManage);