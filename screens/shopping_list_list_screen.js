import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import ShoppingListList from '../components/shopping_list_list';
import { Button, StyleSheet, View } from 'react-native';

const remoteDbUrl = "http://admin:pass@9.24.7.248:35984/testdb";

export default class ShoppingListListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Shopping Lists",
    headerRight: <Button title="+" onPress={() => navigation.navigate('ShoppingListAdd', { pouchdb: navigation.state.params.pouchdb })} />
  });

  constructor(props) {
    super(props);
    this.docs = [];
    this.state = {};
    PouchDB.plugin(PouchDBAsyncStorageAdapter);
    this.db = new PouchDB('testdb', { adapter: 'asyncstorage' });
    this.remoteDb = new PouchDB(remoteDbUrl);
    this.loadDocs();
    this.db.sync(this.remoteDb, {
      live: true,
      retry: true
    }).on('change', (change) => {
      this.loadDocs();
    }).on('error', (err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({ pouchdb: this.db })
  }

  loadDocs() {
    this.db.allDocs({ include_docs: true }, (err, body) => {
      if (err || !body.rows) {
        // handle error
      }
      else {
        console.log("LOAD DOCS");
        docs = [];
        for (let row of body.rows) {
          docs.push(row.doc);
        }
        this.setState({ docs: docs });
      }
    });
  }

  handleItemCheckChanged(list, cb) {
    this.db.put(list)
      .then(function (response) {
        list._rev = response.rev
        cb();
      }).catch(function (err) {
        // mw:TODO
        console.log(err);
        cb(err);
      });
  }

  handleListPressed(list) {
    this.props.navigation.navigate('ShoppingList', { list: list, pouchdb: this.db })
  }

  render() {
    return (
      <View style={styles.container}>
        <ShoppingListList docs={this.state.docs} onListPressed={(list) => this.handleListPressed(list)} onItemCheckChanged={(list, item, callback) => this.handleItemCheckChanged(list, item, callback)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000'
  }
});