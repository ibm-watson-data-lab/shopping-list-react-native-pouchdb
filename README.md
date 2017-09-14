## Tools

- https://facebook.github.io/react-native/ - React Native
- https://reactnavigation.org/ - React Navigation
- http://redux.js.org/ - Redux
- https://github.com/gaearon/redux-thunk - Redux Thunk
- https://pouchdb.com/ - PouchDB library
- https://usecuid.org/ - unique id generation

# Shopping List - with React Native and PouchDB

Shopping List is an Offline First demo [Progressive Web App | hybrid mobile app | native mobile app | desktop app] built using [React Native](https://facebook.github.io/react-native/ ) and [PouchDB](https://pouchdb.com/). [This app is part of a series of Offline First demo apps, each built using a different stack.](https://github.com/ibm-watson-data-lab/shopping-list) 

## Quick Start

1. Install the React Native CLI:

`npm install --g react-native-cli`

2. Clone this repo:

`git clone https://github.com/ibm-watson-data-lab/shopping-list-react-native-pouchdb`

3. cd into repo directory

`cd shopping-list-react-native-pouchdb`

4. Install dependencies

`npm install`

### Run on iOS Emulator:

1. In a terminal cd into the repo directory and run:

`react-native run-ios`

#### Troubleshooting

1. If you encounter issues running the react-native CLI you may need to make a few scripts executable. You can do this on Mac/Linux by running the following commands:

```
chmod +x /usr/local/lib/node_modules/react-native-cli/index.js
chmod +x node_modules/react-native/local-cli/*.sh
chmod +x node_modules/react-native/scripts/*.sh
chmod +x node_modules/react-native/scripts/*.command
```

### Run on Android Emulator

1. Create and start an AVD
2. In a terminal cd into the repo directory
3. Start the debugger:

`npm start &`

4. Run the following command:

`react-native run-android`
