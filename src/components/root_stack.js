import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator  } from 'react-navigation';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './Home';
import Products from './products/index';
import Product from './products/show';
import ListView from './ListView';
import Touchables from './Touchables';
import CartIndex from './carts/index';
import Cart from './carts/show';

const MainStack = createStackNavigator(
  {
    Home     : {
      screen: createMaterialTopTabNavigator(
        {
          Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
              title: 'Home',
            }),
          },
          BestSeller: {
            screen: ListView,
            navigationOptions: ({ navigation }) => ({
              title: 'Sale Today',
              headerStyle: {
                backgroundColor: '#ff5c63',
              },
            }),
          },
          HotItem: {
            screen: Touchables,
            navigationOptions: ({ navigation }) => ({
              title: 'Summary',
            }),
          },
        },
        {
          tabBarOptions : {
            labelStyle: {
              fontSize: 12,
            },
            tabStyle: {

            },
            style: {
              backgroundColor: '#ff5c63',
            },
            scrollEnabled : false,
            indicatorStyle : {
              backgroundColor: '#ffffff',
            }
          }
        }
      ),
      navigationOptions: ({ navigation }) => ({
        title: 'POINT OF SALES',
        headerStyle : {
          backgroundColor : '#ff5c63',
          opacity : 1,
          elevation : 1
        },
        headerTitleStyle: { textAlign:'center', alignSelf:'center',flex:1 },
        headerTintColor: '#fff',
        headerMode : 'float',
        headerLeft: (
          <Entypo
            style={{ marginLeft : 10 }}
            name="menu"
            size={32}
            color="#ffffff"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
        headerRight: (
          <MaterialCommunityIcons
            style={{ marginRight : 10 }}
            name="cart-outline"
            size={24}
            color="#ffffff"
            onPress={() => navigation.navigate('CartIndex')}
          />
        ),
      }),
    },
    Products : {
      screen: Products,
      navigationOptions: ({ navigation }) => ({
        title: 'PRODUCT LIST',
        headerStyle: {
          backgroundColor: '#ff5c63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: { textAlign:'center', alignSelf:'center',flex:1 },
        headerMode : 'float',
        headerRight: (
          <MaterialCommunityIcons
            style={{ marginRight : 10 }}
            name="cart-outline"
            size={24}
            color="#ffffff"
            onPress={() => navigation.navigate('CartIndex')}
          />
        ),
      }),
    },
    CartIndex : {
      screen: CartIndex,

    },
  },
  {
    initialRouteName : 'Home'
  }
);

const RootStack = createStackNavigator(
  {
    Main     :  {
      screen : MainStack
    },
    ProductModal  : {
      screen : Product
    },
    Cart  : {
      screen : Cart
    }
  },
  {
    mode : 'modal',
    headerMode : 'none',
  }
);

const DrawerStack = createDrawerNavigator({
  Home : {
    screen : RootStack,
  },
  Products : {
    screen : Products
  }
},
{
  contentComponent: (props) => (
    <View style={{ flex : 1 }}>
      <View style={{ flex : 3, backgroundColor : '#ff5c63' }}>
        <View style={{ flex : 1}}>
          <View style={{ flex : 1, justifyContent : 'center', padding : 10 }}>
            <TouchableOpacity
              accessible={ true }
              accessibilityLabel={ 'Close Menu' }
              onPress={ ()=> { props.navigation.toggleDrawer() } }>
              <Text style={{ textAlign : 'right' }}>
                <MaterialCommunityIcons
                  name="arrow-left-thick"
                  color="#fff"
                  size={24}/>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ styles.profileImageContainer }>
            <View style={ styles.profileImage }>

            </View>
          </View>
          <View style={{ flex : 1 }}>

          </View>
        </View>
      </View>
      <View style={{ flex : 6 }}>
        <Text>{ global.SampleVar }</Text>
      </View>
      <View style={{ flex : 1, backgroundColor : '#f0f0f0' }}>
        <Text>Custom Header</Text>
      </View>
    </View>
  )
});

const styles = StyleSheet.create({
  profileImageContainer : {
    alignItems : 'center',
    justifyContent : 'center',
    flex : 4,
    padding : 20
  },
  profileImage : {
    backgroundColor : '#f0f0f0',
    borderRadius : 50,
    height : 100,
    width : 100
  }
})

export default class RootStacks extends Component {
  render(){
    return <DrawerStack />
  }
}
