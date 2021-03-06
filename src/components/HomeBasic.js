import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  };

  render() {
    return (
      <View style={{ flex : 1 }}>
        <View style={{ flex : 1, backgroundColor : '#ff5c63', alignItems : 'center', justifyContent : 'center' }}>
        <MaterialCommunityIcons
          name="android"
          size={72}
          color="#fff" />
        </View>
        <View style={{ flex : 2, backgroundColor : '#f0f0f0', padding : 5 }}>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="cart-plus"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Cart' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="dropbox"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Stock' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="cash-multiple"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Audit' }</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="chart-areaspline"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Sales Report' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Profit' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="twitch"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Message' }</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="account-card-details"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Customers' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="source-branch"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Branch' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="tune"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Setting' }</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textMenu : {
    fontSize : 12, color : '#222', marginTop : 10
  },
  iconMenu : {
    flex : 1, alignItems : 'center', backgroundColor : '#fff', justifyContent : 'center', borderColor : '#fff', borderWidth : 1, margin: 5
  }
});
