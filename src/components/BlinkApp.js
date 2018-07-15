import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText : true };

    setInterval( () => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }

  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return (
      <Text>{ display }</Text>
    );
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='Hai Hai' />
        <Blink text='Hai juga' />
      </View>
    );
  }
}
