import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator, NavigationActions  } from 'react-navigation';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../Home';
import Products from '../products/index';
import Product from '../products/show';
import ListView from '../ListView';
import Touchables from '../Touchables';
import CartIndex from '../carts/index';
import Cart from '../carts/show';
import Login from '../auth/Login';



export default class MainStack extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const MainStacks = createStackNavigator(
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
    
    return <MainStacks />
  }
}
