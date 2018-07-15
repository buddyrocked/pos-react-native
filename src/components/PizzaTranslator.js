import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

export default class PizzaTranslator extends Component {
  constructor(props){
    super(props);
    this.state = { text : '' };
  }

  render() {
    return (
      <View style={ styles.view }>
        <TextInput style={ styles.input } placeholder='Type here to translate'
        onChangeText={ (text) => this.setState({ text }) } />
        <Text style={ styles.text }>
          { this.state.text.split(' ').map((word) => word && '🍕').join(' ') }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view : {
    flex : 1,
    padding : 10,
    backgroundColor : 'skyblue'
  },
  input : {
    height : 100,
    backgroundColor : 'white'
  },
  text : {
    padding : 10,
    fontSize : 40
  }
});
