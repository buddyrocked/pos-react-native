import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './src/reducers';
import RootStack from './src/components/root_stack';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export default class App extends React.Component {
  constructor() {
    super();
    global.SampleVar = 'This is Global Variable.';
    global.url = `http://192.168.20.169/point-of-sales/backend/web/v1/`;
    global.access_token = `oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z`;
    //global.url = `http://192.168.43.216/delucent/backend/web/v1/`;
    //global.access_token = `oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z`;
    this.state = { cartCount : 0 }
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <RootStack />
      </Provider>
    );
  }
}
