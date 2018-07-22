import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.removeCart = this.removeCart.bind(this);
    this.setCartId = this.setCartId.bind(this);
    //this.clearCart = this.clearCart.bind(this);
    this.state = { isLoading : true, id : 0 };
  }

  static clearCart = () => {
    const url = global.url;
    const access_token = global.access_token;

    return fetch(`${url}carts/clear-cart?access-token=${access_token}`, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      Alert.alert('hahah');
      this.setState({
        dataSource : null
      });
    })
    .catch((error) => {
      Alert.alert(error.message);
      console.warn(JSON.stringify(error));
    });
  }

  componentDidMount(){
    this.props.navigation.setParams({ clearCart: ()=>this.clearCart, test : 'ahahahaha' });

    const url = global.url;
    const access_token = global.access_token;

    return fetch(`${url}carts?access-token=${access_token}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.count == 0){
          this.setState({
            isLoading : false,
            dataSource : responseJson.items,
            total : responseJson.total,
            count : responseJson.count,
            terbilang : responseJson.terbilang
          });
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

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
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
            const url = global.url;
            const access_token = global.access_token;

            return fetch(`${url}carts/clear-cart?access-token=${access_token}`, {
              method: 'DELETE'
            })
            .then((response) => response.json())
            .then((responseJson) => {
              navigation.push('CartIndex');
            })
            .catch((error) => {
              Alert.alert(error.message);
              console.warn(JSON.stringify(error));
            });
          }}
        />
      )
    }
  };

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

  removeCart() {
    const { id } = this.state;
    const url = global.url;
    const access_token = global.access_token;

    return fetch(`${url}carts/${id}?access-token=${access_token}`, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.hideAlert();
      this.props.navigation.navigate('Products');
    })
    .catch((error) => {
      Alert.alert('error');
      console.log(JSON.stringify(error));
    });
  }



  ListEmptyView = () => {
    return (
      <View style={{ flex : 1, justifyContent : 'center' }}>
        <Text style={{textAlign: 'center'}}> Cart Is Empty</Text>
      </View>
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{ flex : 1, padding : 20, justifyContent : 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if(this.state.count == 0){
      return(
        <View style={{ flex : 1, padding : 20, justifyContent : 'center', alignItems : 'center' }}>
          <MaterialCommunityIcons
            name="cart-off"
            size={72}
            color="#ff5c63" />
          <Text style={{textAlign: 'center'}}> Cart Is Empty</Text>
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
                          size={18}
                          color="#ff5c63" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }
            keyExtractor={ (item, index) => index.toString() }
            ListEmptyComponent={ this.ListEmptyComponent }
          />
        </View>
        <View style={ styles.actionContainer }>
          <View style={{ flex : 1 }}>
            <Text style={ styles.actionMoney }><MaterialCommunityIcons name="tag-multiple" size={12} color="#ff5c63" /> { this.state.total }</Text>
            <Text style={ styles.actionSpell }><MaterialCommunityIcons name="volume-high" size={12} color="#ff5c63" /> { this.state.terbilang }</Text>
          </View>
          <View style={{ flex : 1 }}>
            <Button
              title="CHECKOUT"
              color="#ff5c63"
              onPress={ () => this.props.navigation.navigate('Cart') }/>
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
            this.removeCart();
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
