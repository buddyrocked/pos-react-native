import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Network from './Network';

class HomeScreen extends Component {
  render() {
    return(
      <View style={{ flex : 1, alignItems : 'center', justifyContent : 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const Navigations = createStackNavigator({
  Home : {
    screen : HomeScreen
  },
  Network : {
    screen : Network
  }
});

export default Navigations;
