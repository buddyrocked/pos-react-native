import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading : false,
      count : 0,
      total : 0,
      grand_total : 0,
      discount : 0,
      tax : 0,
      pay : 0,
      change : 0,
      note : '',
      customer_id : 1,
      user_id : 1,
      print : false,
      status : false
    }
  }

  toggleSwitchPrint = (value) => {
    this.setState({
      print : value
    });
  }

  toggleSwitchStatus = (value) => {
    this.setState({
      status : value
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title : navigation.getParam('title'),
    }
  };

  componentDidMount(){
    const url = global.url;
    const access_token = global.access_token;

    return fetch(`${url}carts?access-token=${access_token}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading : false,
          carts : responseJson.items,
          count : responseJson.count,
          total : responseJson.total,
          grand_total : responseJson.total,
          pay   : responseJson.total
        }, function(){

        });
      })
      .catch((error) => {
        Alert.alert(error);
        console.log(error);
      });
  }

  calculateChange = (pay) => {
    this.setState({
      change : this.state.pay - this.state.total
    });
  }

  render() {

    if(this.state.isLoading){
      return(
        <View style={{ flex : 1, padding : 20, justifyContent : 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return(
      <View style={ styles.cartContainer }>
        <View style={ styles.cartHeader }>
          <MaterialCommunityIcons
            name="arrow-left-thick"
            size={24}
            color="#ddd"
            onPress={ ()=> this.props.navigation.navigate('CartIndex') } />
          </View>
        <View style={ styles.cartImage }>
          <MaterialCommunityIcons
            name="credit-card-plus"
            size={100}
            color="#ff5c63" />
        </View>
        <View style={ styles.cartInfo }>
          <View style={ styles.cartInfoItem }>
            <View style={ styles.cartInfoItemIcon }>
              <MaterialCommunityIcons name="cart" size={24} color="#ff5c63" />
            </View>
            <View style={ styles.cartInfoItemText }>
                <Text style={ styles.cartInfoText }>{ this.state.total }</Text>
            </View>
          </View>
          <View style={ styles.cartInfoItem }>
            <View style={ styles.cartInfoItemIcon }>
              <MaterialCommunityIcons name="gift" size={24} color="#ff5c63" />
            </View>
            <View style={ styles.cartInfoItemText }>
              <TextInput style={ styles.input } onChangeText={ discount => this.setState({discount}) } placeholder='Discount' underlineColorAndroid={'transparent'} keyboardType='numeric' />
            </View>
          </View>
          <View style={ styles.cartInfoItem }>
            <View style={ styles.cartInfoItemIcon }>
              <MaterialCommunityIcons name="credit-card-plus" size={24} color="#ff5c63" />
            </View>
            <View style={ styles.cartInfoItemText }>
              <TextInput style={ styles.input } onChangeText={ pay => this.calculateChange(pay) } placeholder='Pay' underlineColorAndroid={'transparent'} keyboardType='numeric' />
            </View>
          </View>
          <View style={ styles.cartInfoItem }>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItemText }>
                <Text style={ styles.cartInfoText }>{ this.state.change }</Text>
              </View>
            </View>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItemText }>
                <Text style={ styles.cartInfoText }>{ this.state.grand_total }</Text>
              </View>
            </View>
          </View>
          <View style={{ flex:1, flexDirection: 'row' }}>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItem }>
                <Switch value={ this.state.print } onValueChange={ this.toggleSwitchPrint } onTintColor="#999" thumbTintColor="#ff5c63" accessibilityLabel="Print" />
              </View>
            </View>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItem }>
                <Switch value={ this.state.status } onValueChange={ this.toggleSwitchStatus } onTintColor="#999" thumbTintColor="#ff5c63" accessibilityLabel="Status" />
              </View>
            </View>
          </View>
        </View>
        <View style={ styles.cartAction }>
          <TouchableOpacity
            accessible={ true }
            style={{ flex : 1 }}
            accessibilityLabel={ 'Process' }
            onPress={ () => this.props.navigation.navigate('Products') }>
            <View style={ styles.buttonAction }>
              <Text style={{ fontSize:24, color: '#fff', fontWeight: 'bold' }}><MaterialCommunityIcons name="check-circle-outline" size={24} color="#fff" /> PROCESS</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cartContainer : {
    flex : 1,
    padding : 0,
    margin : 20,
    backgroundColor : '#fff',
    borderColor:'#f0f0f0',
    borderWidth:1,
  },
  cartHeader : {
    flex:1,
    padding : 10
  },
  cartImage : {
    backgroundColor : '#fff',
    flex : 2,
    alignItems : 'center',
    justifyContent : 'center'
  },
  cartInfo : {
    flex : 5,
    marginTop : 20,
  },
  cartInfoItem : {
    flex:1,
    flexDirection:'row',
    borderColor:'#f0f0f0',
    borderWidth:1,
    marginTop:-1
  },
  cartInfoItemIcon : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartInfoItemText : {
    flex:4,
    justifyContent: 'center',
    paddingRight : 10,
    paddingLeft : 10
  },
  cartAction : {
    flex : 1,
    backgroundColor : '#f0f0f0',
    padding : 0
  },
  buttonAction: {
    alignItems: 'center',
    backgroundColor : '#ff5c63',
    flex : 1,
    justifyContent : 'center',
  },
  cartInfoText : {
    fontWeight : 'bold',
    fontSize : 18,
  },
  cartQtyIcon: {
    flex : 4,
  },
  cartQtyText: {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  input : {
    paddingTop : 20,
    paddingBottom : 20,
    paddingLeft : 5,
    paddingRight : 5,
    fontWeight : 'bold',
    fontSize : 18,
  },
})
