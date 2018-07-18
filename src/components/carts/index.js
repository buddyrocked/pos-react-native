import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.clearCart = this.clearCart.bind(this);
    this.state = { isLoading : true }
  }

  clearCart(){
    Alert.alert('Cart Cleared..!');
  }

  componentDidMount(){
    return fetch(`http://192.168.20.250/point-of-sales/backend/web/v1/carts?access-token=5OUnd1-w5xqdXvXu8fiUgC7zwW9eCmch`)
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
                </View>
              </View>
            }
            keyExtractor={ (item, index) => index.toString() }
          />
        </View>
        <View style={ styles.actionContainer }>
          <View style={{ flex : 1 }}>
            <Text><MaterialCommunityIcons name="tag-multiple" size={12} color="#ff5c63" /> { this.state.total }</Text>
            <Text><MaterialCommunityIcons name="volume-high" size={12} color="#ff5c63" /> { this.state.terbilang }</Text>
          </View>
          <View style={{ flex : 1 }}>
            <Button
              title="PROCESS"
              color="#ff5c63"
              onPress={ () => this.clearCart() }/>
          </View>
        </View>
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
  }
});
