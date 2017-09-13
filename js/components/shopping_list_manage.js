import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShoppingListItem from './shopping_list_item';
import ShoppingListItemAdd from './shopping_list_item_add';
import { setCurrentList } from '../actions/index'

class ShoppingListManage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setCurrentList(this.props.list);
  }

  renderFlatListItem(item, list) {
    return (
      <ShoppingListItem item={item} list={list} />
    );
  }
  
  render() {
    const list = this.props.currentList ? this.props.currentList : this.props.list;
    return (
      <View style={styles.container}>
        <Text>{list.title}</Text>
        <FlatList
          data={list.items}
          renderItem={({ item }) => this.renderFlatListItem(item, list)}
          keyExtractor={item => item._id}
          extraData={list._rev}
        >
        </FlatList>
        <ShoppingListItemAdd list={list} onItemTextChanged={this.props.onItemTextChanged} onItemAdded={this.props.onItemAdded} />
      </View>
    );
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
    setCurrentList: setCurrentList
  }, dispatch);
}

function mapStateToProps(state) {
	return {
    currentList: state.currentList
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingListManage);