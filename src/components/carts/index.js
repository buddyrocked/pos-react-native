import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.clearCart = this.clearCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
    this.setCartId = this.setCartId.bind(this);
    this.state = { isLoading : true, id : 0 }
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

  setCartId(id){
    this.showAlert();
    this.setState({
      id: id
    });
  }

  removeCart(id) {
    return fetch(`http://192.168.43.216/delucent/backend/web/v1/carts/${id}?access-token=oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        message : responseJson.message
      });

      this.props.navigation.navigate('CartIndex');
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.log(JSON.stringify(error));
    });
  }

  clearCart(){
    Alert.alert('Cart Cleared..!');
  }

  componentDidMount(){
    return fetch(`http://192.168.43.216/delucent/backend/web/v1/carts?access-token=oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z`)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.count == 0){
          Alert.alert("Cart is Empty.");
        } else {
          this.setState({
            isLoading : false,
            dataSource : responseJson.items,
            total : responseJson.total,
            count : responseJson.count,
            terbilang : responseJson.terbilang
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
          <Text style={{ textAlign : 'center', marginTop: 20, fontWeight : 'bold', color : '#666' }}>Shopping Cart is Empty</Text>
        </View>
      );
    }

    return(
      <View style={ styles.pageContainer }>
        <View style={ styles.listContainer }>
          <FlatList
            data={ this.state.dataSource }
            renderItem={ ({item}) =>
              <View style={ styles.itemContainer }>
                <View style={{ flex : 1, flexDirection : 'row' }}>
                  <View style={ styles.itemImage }>

                  </View>
                  <View style={ styles.itemInfo }>
                    <Text style={ styles.itemInfoCode }>{ item.sku } - { item.type }</Text>
                    <Text style={ styles.itemInfoName }>{ item.quantity }{ item.unit }</Text>
                    <Text style={ styles.itemInfoPrice }>{ item.subtotal } </Text>
                  </View>
                  <View style={ styles.itemAction }>
                    <TouchableOpacity
                      style={{ flex : 1 }}
                      accessible={ true }
                      accessibilityLabel={ 'Remove Cart' }
                      onPress={ () => this.setCartId(item.id) }>
                      <View style={ styles.itemIcon }>
                        <MaterialCommunityIcons
                          name="delete"
                          size={24}
                          color="#ff5c63" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }
            keyExtractor={ (item, index) => index.toString() }
          />
        </View>
        <View style={ styles.actionContainer }>
          <View style={{ flex : 1 }}>
            <Text style={ styles.actionMoney }><MaterialCommunityIcons name="tag-multiple" size={12} color="#ff5c63" /> { this.state.total }</Text>
            <Text style={ styles.actionSpell }><MaterialCommunityIcons name="volume-high" size={12} color="#ff5c63" /> { this.state.terbilang }</Text>
          </View>
          <View style={{ flex : 1 }}>
            <Button
              title="PROCCESS"
              color="#ff5c63"
              onPress={ () => this.clearCart() }/>
          </View>
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Information"
          message={this.state.message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, Cancel"
          confirmText="Yes, Remove"
          confirmButtonColor="#ff5c63"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.removeCart(this.state.id);
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
  pageContainer : {
    flex : 1,
  },
  listContainer : {
    flex : 8,
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
  actionContainer: {
    flex : 2,
    backgroundColor : '#fff',
    padding : 20
  },
  actionMoney : {
    fontWeight : 'bold',
  },
  actionSpell : {
    color : '#333'
  }
});
