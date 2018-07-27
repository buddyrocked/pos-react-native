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
      total_text : 0,
      grand_total : 0,
      discount : 0,
      tax : 0,
      pay : 0,
      change : 0,
      note : '',
      customer_id : 1,
      user_id : 1,
      print : true,
      status : true
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
          total_text : responseJson.total_text,
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
      change : pay - this.state.grand_total
    });
  }

  calculateDiscount = (discount) => {
    this.setState({
      grand_total : this.state.total - discount
    });
  }

  submit() {
    const url = global.url;
    const access_token = global.access_token;
    return fetch(`${url}carts/submit?access-token=${access_token}`, {
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        total : this.state.total,
        grand_total : this.state.grand_total,
        discount : this.state.discount,
        tax : this.state.tax,
        pay : this.state.pay,
        change : this.state.change,
        note : this.state.note,
        customer_id : this.state.customer_id,
        user_id : this.state.user_id,
        print : this.state.print,
        status : this.state.status
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson.message);
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(JSON.stringify(error));
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
                <Text style={ styles.cartInfoText }>{ this.state.total_text }</Text>
            </View>
          </View>
          <View style={ styles.cartInfoItem }>
            <View style={ styles.cartInfoItemIcon }>
              <MaterialCommunityIcons name="gift" size={24} color="#ff5c63" />
            </View>
            <View style={ styles.cartInfoItemText }>
              <TextInput style={ styles.input } onChangeText={ discount => this.calculateDiscount(discount) } placeholder='Discount' underlineColorAndroid={'transparent'} keyboardType='numeric' />
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
                <Text style={ styles.smallLabel }>CHANGE</Text>
                <Text style={ styles.cartInfoTextCenterRed }>Rp.{ this.state.change }</Text>
              </View>
            </View>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItemText }>
                <Text style={ styles.smallLabel }>GRAND TOTAL</Text>
                <Text style={ styles.cartInfoTextCenter }>Rp.{ this.state.grand_total }</Text>
              </View>
            </View>
          </View>
          <View style={ styles.cartInfoItem }>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItemText }>
                <View style={{ flex : 1, flexDirection : 'row' }}>
                  <View style={{ flex : 1, justifyContent : 'center' }}>
                    <MaterialCommunityIcons name="printer" size={48} color="#666" />
                  </View>
                  <View style={{ flex : 2, justifyContent : 'center', alignItems : 'center' }}>
                    <Switch value={ this.state.print } onValueChange={ this.toggleSwitchPrint } onTintColor="#999" thumbTintColor="#ff5c63" accessibilityLabel="Print" />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex : 1 }}>
              <View style={ styles.cartInfoItemText }>
                <View style={{ flex : 1, flexDirection : 'row' }}>
                  <View style={{ flex : 1, justifyContent : 'center' }}>
                      <MaterialCommunityIcons name="account-check" size={48} color="#666" />
                  </View>
                  <View style={{ flex : 2, justifyContent : 'center', alignItems : 'center' }}>
                    <Switch value={ this.state.status } onValueChange={ this.toggleSwitchStatus } onTintColor="#999" thumbTintColor="#ff5c63" accessibilityLabel="Status" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={ styles.cartAction }>
          <TouchableOpacity
            accessible={ true }
            style={{ flex : 1 }}
            accessibilityLabel={ 'Process' }
            onPress={ () => this.submit() }>
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
  cartInfoTextCenter : {
    fontWeight : 'bold',
    fontSize : 18,
    textAlign : 'center'
  },
  cartInfoTextCenterRed : {
    color : '#ff5c63',
    fontWeight : 'bold',
    fontSize : 18,
    textAlign : 'center'
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
    color : '#666',
    paddingTop : 20,
    paddingBottom : 20,
    paddingLeft : 0,
    paddingRight : 5,
    fontWeight : 'bold',
    fontSize : 18,
  },
  textCenter : {
    textAlign : 'center',
  },
  smallLabel : {
    color : '#666',
    fontSize : 11,
    textAlign : 'center'
  }
})
