import React, { Component } from 'react';
import { Button } from 'react-native';
import ShoppingListManage from '../components/shopping_list_manage';

export default class ShoppingListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.list.name,
    headerRight: <Button title={navigation.state.params.buttonTitle ? navigation.state.params.buttonTitle : ''} color='#FFFFFF' onPress={() => navigation.state.params.onDonePressed()} />,
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2'
    }
  });

  constructor(props) {
    super(props);
    this.state = {list: this.props.navigation.state.params.list};
  }

  handleDonePressed() {
    if (this.props.navigation.state.params.text != '') {
      this.handleItemAdded(this.props.navigation.state.params.text, () => {});
    }
  }

  componentDidMount() {
    this.setState({list: this.props.navigation.state.params.list});
    this.props.navigation.setParams({ text: '', buttonTitle: '', onDonePressed: () => this.handleDonePressed() })
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
        cb(err);
      });
  }

  handleItemTextChanged(text) {
    let buttonTitle = text == '' ? '' : 'Done';
    this.props.navigation.setParams({ text: text, buttonTitle: buttonTitle, onDonePressed: () => this.handleDonePressed() })
  }

  handleItemAdded(text, cb) {
    let pouchdb = this.props.navigation.state.params.pouchdb;
    let list = this.props.navigation.state.params.list;
    if (!list.items) {
      list.items = [];
    }
    list.items.push({
      _id: `item${list.items.length}`,
      name: text,
      checked: false
    });
    pouchdb.put(list)
      .then((response) => {
        list._rev = response.rev;
        this.setState({list: list});
        cb();
      }).catch((err) => {
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
        cb(err);
      });
  }

  render() {
    return (
      <ShoppingListManage
        list={this.state.list}
        onItemCheckChanged={(item, callback) => this.handleItemCheckChanged(item, callback)}
        onItemTextChanged={(text) => this.handleItemTextChanged(text)}
        onItemAdded={(text, callback) => this.handleItemAdded(text, callback)}
        onItemDeleted={(item, callback) => this.handleItemDeleted(item, callback)}
      />
    );
  }
}