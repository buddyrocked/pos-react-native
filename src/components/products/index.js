import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = { showAlert: false };
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      isLoading : true,
      id : 1,
      qty : 1,
      text : '',
      message : '',
      confirmText : 'Oke'
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  addToCart (param1, param2) {
    const url = global.url;
    const access_token = global.access_token;
    return fetch(`${url}carts?access-token=${access_token}`, {
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: param1,
        value: param2,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        message : responseJson.message
      });
      this.showAlert();
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(JSON.stringify(error));
    });
  }

  componentDidMount(){
    const url = global.url;
    const access_token = global.access_token;

    return fetch(`${url}prices?expand=product&access-token=${access_token}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 0){
          Alert.alert(responseJson.message);
        } else {
          this.setState({
            isLoading : false,
            dataSource : responseJson.items,
          }, function(){

          });
        }
      })
      .catch((error) => {
        Alert.alert(error);
        console.log(error);
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
      <View style={ styles.listContainer }>
        <View>
          <TextInput style={ styles.input } placeholder='Search Products'
          onChangeText={ (text) => this.setState({ text }) } />
          <Text style={ styles.text }>
            { this.state.text.split(' ').map((word) => word && '🍕').join(' ') }
          </Text>
        </View>
        <FlatList
          data={ this.state.dataSource }
          renderItem={ ({item}) =>
            <View style={ styles.itemContainer }>
              <View style={{ flex : 1, flexDirection : 'row' }}>
                <View style={ styles.itemImage }>

                </View>
                <View style={ styles.itemInfo }>
                  <Text style={ styles.itemInfoCode }>{ item.product.sku } - { item.product.type_name }</Text>
                  <Text style={ styles.itemInfoName }>{ item.product.name }</Text>
                  <Text style={ styles.itemInfoPrice }>
                    <MaterialCommunityIcons name="tag-multiple" size={12} color="#ff5c63" />
                     { item.price }
                  </Text>
                </View>
                <View style={ styles.itemAction }>
                  <TouchableOpacity
                    style={{ flex : 1 }}
                    accessible={ true }
                    accessibilityLabel={ 'Tap Me' }
                    onPress={ () => this.addToCart(item.id, 1) }>
                    <View style={ styles.itemIcon }>
                      <MaterialCommunityIcons
                        name="cart-plus"
                        size={30}
                        color="#ff5c63" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          keyExtractor={ (item, index) => index.toString() }
        />
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Information"
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, Cancel"
          confirmText={this.state.confirmText}
          confirmButtonColor="#ff5c63"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    flex : 1
  },
  listContainer : {
    flex : 1,
    margin : 5
  },
  itemContainer : {
    padding : 15, backgroundColor : 'white', marginBottom : -1, borderColor : '#e0e0e0', borderWidth : 1
  },
  itemImage : {
    flex : 1,
    backgroundColor: '#f0f0f0',
    height : 60
  },
  itemInfo : {
    flex : 3,
    paddingLeft : 10,
    paddingRight : 10,
  },
  itemInfoCode : {
    color : '#444',
    fontWeight : 'bold'
  },
  itemInfoName : {
    color : '#777'
  },
  itemInfoPrice : {
    color : '#ff5c63',
    fontSize : 12,
    fontWeight : 'bold',
    marginTop : 5
  },
  itemAction : {
    flex : 1,
  },
  input : {
    paddingTop : 20,
    paddingBottom : 20,
    paddingLeft : 5,
    paddingRight : 5,
  },
});
