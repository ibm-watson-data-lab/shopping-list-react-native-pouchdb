import React, { Component } from 'react';
import { Button } from 'react-native';
import ShoppingList from '../components/shopping_list';

export default class ShoppingListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.list.name,
    headerRight: <Button title="+" onPress={() => navigation.navigate('ShoppingListItemAdd', { list: navigation.state.params.list, pouchdb: navigation.state.params.pouchdb, onItemAdded: navigation.state.params.onItemAdded })} />
  });

  constructor(props) {
    super(props);
  }

  handleItemAdded() {
    console.log("handleItemADDEDDDEDEDEDEDE");
    this.setState({});
  }

  componentDidMount() {
    this.props.navigation.setParams({ onItemAdded: () => this.handleItemAdded() })
  }

  handleItemCheckChanged(item, cb) {
    let pouchdb = this.props.navigation.state.params.pouchdb;
    let list = this.props.navigation.state.params.list;
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev
        cb();
      }).catch((err) => {
        // mw:TODO
        console.log(err);
        cb(err);
      });
  }

  handleListPressed() {

  }

  render() {
    console.log(this.props.navigation.state.params.list);
    return (
      <ShoppingList
        list={this.props.navigation.state.params.list}
        onListPressed={this.handleListPressed}
        onItemCheckChanged={(item, checked, callback) => this.handleItemCheckChanged(item, checked, callback)}
      />
    );
  }
}