/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PouchDB from 'pouchdb-browser';
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage';
import ShoppingListList from './components/shopping_list_list';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

const remoteDbUrl = "http://admin:pass@9.24.7.248:35984/testdb";

export default class HelloReactNative extends Component {
  constructor(props) {
    super(props);
    this.docs = [];
    this.state = {};
    PouchDB.plugin(PouchDBAsyncStorageAdapter);
    this.db = new PouchDB('testdb', {adapter: 'asyncstorage'});
    this.remoteDb = new PouchDB(remoteDbUrl);
    this.getDocs();
	  this.dbLoaded = true;
	  console.log("What up?!");
	  console.log(this.db);
	  this.db.sync(this.remoteDb, {
      live: true,
      retry: true
	  }).on('change', (change) => {
		  this.getDocs();
	  }).on('error', (err) => {
      console.log(err);
	  });
  }

  getDocs() {
      this.db.allDocs({include_docs: true}, (err, body) => {
          if (err || !body.rows || body.rows.length == 0) {
            this.msg = 'No documents.';
        }
        else {
          console.log(this);
          this.docs.splice(0, this.docs.length);
          for (let row of body.rows) {
              this.docs.push(row.doc);
              console.log(row.doc);
          }
        }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Shopping List Coming Soon...
        </Text>
        <ShoppingListList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ShoppingList', () => HelloReactNative);
