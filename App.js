import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './src/reducers';
import RootStack from './src/components/navigation/root_stack';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(reducers, applyMiddleware(promise, thunk));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartCount : 0 }
  }

  render() {
      return (
        <Provider store={store}>
          <RootStack />
        </Provider>
      );
  }
}
