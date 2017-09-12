import React, { Component } from 'react';
import { Button } from 'react-native';
import ShoppingList from '../components/shopping_list';

export default class ShoppingListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.list.name,
    headerRight: <Button title='+' color='#FFFFFF' onPress={() => navigation.navigate('ShoppingListItemAdd', { list: navigation.state.params.list, pouchdb: navigation.state.params.pouchdb, onItemAdded: navigation.state.params.onItemAdded })} />,
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2'
    }
  });

  constructor(props) {
    super(props);
    this.state = {list: this.props.navigation.state.params.list};
  }

  handleItemAdded() {
    this.setState({list: this.props.navigation.state.params.list});
  }

  componentDidMount() {
    this.setState({list: this.props.navigation.state.params.list});
    this.props.navigation.setParams({ onItemAdded: () => this.handleItemAdded() })
  }

  handleItemCheckChanged(item, cb) {
    let pouchdb = this.props.navigation.state.params.pouchdb;
    let list = this.props.navigation.state.params.list;
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev
        this.setState({list: list});
        cb();
      }).catch((err) => {
        // mw:TODO
        console.log(err);
        cb(err);
      });
  }

  handleItemDeleted(item, cb) {
    let pouchdb = this.props.navigation.state.params.pouchdb;
    let list = this.props.navigation.state.params.list;
    var index = list.items.indexOf(item);
    if (index > -1) {
      list.items.splice(index, 1);
    }
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev
        this.setState({list: list});
        cb();
      }).catch((err) => {
        // mw:TODO
        console.log(err);
        cb(err);
      });
  }

  render() {
    return (
      <ShoppingList
        list={this.state.list}
        onItemCheckChanged={(item, callback) => this.handleItemCheckChanged(item, callback)}
        onItemDeleted={(item, callback) => this.handleItemDeleted(item, callback)}
      />
    );
  }
}