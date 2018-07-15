import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class StyleApp extends Component {
  render() {
    return (
      <View>
        <Text style={ styles.bigBlue }>Big Blue</Text>
        <Text style={ styles.red }>Red</Text>
        <Text style={ styles.red, styles.bigBlue }>Red</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bigBlue : {
    color : 'blue',
    fontWeight : 'bold',
    fontSize : 30
  },
  red : {
    color : 'red'
  }
});
