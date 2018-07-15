import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}! </Text>
    );
  }
}

export default class SayGreeting extends Component {
  render() {
    return (
      <View style={{ alignItems : "center" }}>
        <Greeting name="Budi Hariyana" />
        <Greeting name="Asni Neri" />
        <Greeting name="Muhammad Pradipta Langit Sagara" />
      </View>
    );
  }
}
