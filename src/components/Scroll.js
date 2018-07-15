import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';

export default class Scroll extends Component {
  render() {
    return (
      <ScrollView>
        <Text style={{ fontSize : 100 }}> Lorem ipsum dolor sir amet</Text>
        <Text style={{ fontSize : 100 }}> Lorem ipsum dolor sir amet 2</Text>
      </ScrollView>
    );
  }
}
