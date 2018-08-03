import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Button, View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createDrawerNavigator  } from 'react-navigation';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../Home';
import Products from '../products/index';
import Product from '../products/show';
import ListView from '../ListView';
import Touchables from '../Touchables';
import CartIndex from '../carts/index';
import Cart from '../carts/show';
import Login from '../auth/Login';
import { fetchCarts, getCart, clearCart } from '../../actions';

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
  },
  menuItems : {
    borderColor : '#f0f0f0',
    borderBottomWidth : 1,
    flex : 1,
    flexDirection : 'row',
    padding : 20,
  },
  menuItemsIcon : {
    flex : 2,
    alignItems : 'center'
  },
  menuItemsTextContainer : {
    flex : 8,
  },
  menuItemsText : {
    fontSize : 14,
  },
})

class RootStacks extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart_count : 0,
    };
  }

  componentDidMount(){
    this.props.onGetCart();
  }

  updateCartInfo = () => {
    this.props.onGetCart();
  };

  render(){
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
              <View style={{ flex : 1, flexDirection : 'row'}}>
                <View style={{ flex : 1 }}>
                  <MaterialCommunityIcons
                    style={{ marginRight : 10 }}
                    name="cart-outline"
                    size={24}
                    color="#ffffff"
                    onPress={() => navigation.navigate('CartIndex')}
                  />
                </View>
                <View style={{ flex : 1, paddingRight:10 }}>
                  <Text style={{ color : '#fff', fontSize : 18, fontWeight : 'bold' }}>{ this.props.cart_count }</Text>
                </View>
              </View>
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
              <View style={{ flex : 1, flexDirection : 'row'}}>
                <View style={{ flex : 1 }}>
                  <MaterialCommunityIcons
                    style={{ marginRight : 10 }}
                    name="cart-outline"
                    size={24}
                    color="#ffffff"
                    onPress={() => navigation.navigate('CartIndex')}
                  />
                </View>
                <View style={{ flex : 1, paddingRight:10 }}>
                  <Text style={{ color : '#fff', fontSize : 18, fontWeight : 'bold' }}>{ this.props.cart_count }</Text>
                </View>
              </View>
            ),
          }),
        },
        CartIndex : {
          screen: CartIndex,
          navigationOptions: ({navigation}) => ({
            title: 'Shopping Cart',
            headerStyle: {
              backgroundColor: '#ff5c63',
            },
            headerTintColor: '#fff',
            headerTitleStyle: { textAlign:'center', alignSelf:'center',flex:1 },
            headerMode : 'float',
            headerRight: (
              <MaterialCommunityIcons
                style={{ marginRight : 10 }}
                name="delete-forever"
                size={24}
                color="#ffffff"
                onPress={ () => {
                  this.props.onClearCart(() => {
                    Alert.alert('Cart has been empty');
                    this.props.onFetchCarts();
                  });
                }}
              />
            )
          })
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
                <Text>{ '' }</Text>
              </View>
            </View>
          </View>
          <View style={{ flex : 6 }}>
            <ScrollView>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> props.navigation.navigate('Products') }>
                <View style={ styles.menuItems }>
                  <View style={ styles.menuItemsIcon }>
                    <MaterialCommunityIcons
                      name="cart-plus"
                      size={24}
                      color="#ff5c63" />
                  </View>
                  <View style={ styles.menuItemsTextContainer }>
                    <Text style={ styles.menuItemsText }>
                        { 'Create Order' }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{ flex : 1, backgroundColor : '#f0f0f0' }}>
            <Text>{ '' }</Text>
          </View>
        </View>
      )
    });

    if (this.props.token !== '') {
      return <DrawerStack />
    } else {
      return <Login />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.auth.token,
        username: state.auth.username,
        user_id: state.auth.user_id,
        cart : state.cart,
        cart_count : state.cart.count
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCart : (callback) => { dispatch(clearCart(callback)); },
    onGetCart : () => { dispatch(getCart()); },
    onFetchCarts : () => { dispatch(fetchCarts()); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootStacks);
