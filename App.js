import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootStack from './src/components/root_stack';

export default class App extends React.Component {
  constructor() {
    super();
    global.SampleVar = 'This is Global Variable.';
    global.url = `http://192.168.20.250/point-of-sales/backend/web/v1/`;
    global.access_token = `5OUnd1-w5xqdXvXu8fiUgC7zwW9eCmch`;
    this.state = { cartCount : 0 }
  }

  render() {
    return (
      <RootStack />
    );
  }
}
