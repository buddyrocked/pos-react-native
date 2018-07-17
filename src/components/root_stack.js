import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator  } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';

import Home from './Home';
import Products from './products/index';
import Product from './products/show';
import ListView from './ListView';
import Touchables from './Touchables';
import CartIndex from './carts/index';

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
          <Entypo
            style={{ marginRight : 10 }}
            name="shopping-cart"
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
          <Entypo
            style={{ marginRight : 10 }}
            name="shopping-cart"
            size={24}
            color="#ffffff"
            onPress={() => navigation.navigate('CartIndex')}
          />
        ),
      }),
    },
    CartIndex : {
      screen: CartIndex,
      navigationOptions: ({ navigation }) => ({
        title: 'Shopping Cart',
        headerStyle: {
          backgroundColor: '#ff5c63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerMode : 'float'
      }),
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
    }
  },
  {
    mode : 'modal',
    headerMode : 'none',
  }
);

export default DrawerStack = createDrawerNavigator({
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
        <Text>Custom Header</Text>
      </View>
      <View style={{ flex : 6 }}>
        <Text>Custom Footer</Text>
      </View>
      <View style={{ flex : 1, backgroundColor : '#f0f0f0' }}>
        <Text>Custom Header</Text>
      </View>
    </View>
  )
});
