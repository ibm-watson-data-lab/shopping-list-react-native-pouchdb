import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import ShoppingListList from '../components/shopping_list_list';
import { Button, StyleSheet, View } from 'react-native';

const remoteDbUrl = "http://admin:pass@9.24.7.248:35984/testdb";
//const remoteDbUrl = "http://admin:pass@192.168.1.70:35984/testdb";

export default class ShoppingListListScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Shopping Lists",
    headerRight: <Button title='+' color='#FFFFFF' onPress={() => navigation.navigate('ShoppingListAdd', { pouchdb: navigation.state.params.pouchdb })} />,
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4A90E2'
    }
  });

  constructor(props) {
    super(props);
    this.docs = [];
    this.state = {docs: []};
    PouchDB.plugin(PouchDBAsyncStorageAdapter);
    this.db = new PouchDB('testdb', { adapter: 'asyncstorage' });
    this.remoteDb = new PouchDB(remoteDbUrl);
    this.loadDocs();
    this.db.sync(this.remoteDb, {
      live: true,
      retry: true
    }).on('change', (change) => {
      // console.log("CHANGER!");
      this.loadDocs();
    }).on('error', (err) => {
      console.log(err);
    });
    this.db.changes({
      since: 0,
      live: true
    }).on('change', (change) => {
      console.log("CHANGER!");
      this.loadDocs();
    }).on('error', (err) => {
      console.log(err);
    }).catch((err) => {
      // handle errors
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
        docs = [];
        for (let row of body.rows) {
          docs.push(row.doc);
        }
        this.setState({ docs: docs });
      }
    });
  }

  handleListPressed(list) {
    this.props.navigation.navigate('ShoppingList', { list: list, pouchdb: this.db })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ShoppingListList docs={this.state.docs} onListPressed={(list) => this.handleListPressed(list)} />
      </View>
    );
  }
}