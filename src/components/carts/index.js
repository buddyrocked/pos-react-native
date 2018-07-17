import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, Text } from 'react-native';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading : true }
  }

  componentDidMount(){
    return fetch(`http://192.168.20.225/point-of-sales/backend/web/v1/carts?access-token=5OUnd1-w5xqdXvXu8fiUgC7zwW9eCmch`)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.count == 0){
          Alert.alert("Cart is Empty.");
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
          <Text style={{ textAlign : 'center', marginTop: 20, fontWeight : 'bold', color : '#666' }}>Shopping Cart is Empty</Text>
        </View>
      );
    }

    return(
      <View style={{ flex: 1 }}>
        <FlatList
          data={ this.state.dataSource }
          renderItem={ ({item}) =>
            <View style={{ height : 100, padding : 10, backgroundColor : 'white', marginTop : 5 }}>
              <View>
                <Text style={{ fontWeight : 'bold' }}>{ item.product }</Text>
                <Text>{ item.type }</Text>
                <Text>{ item.quantity } { item.unit }</Text>
              </View>
            </View>
          }
          keyExtractor={ (item, index) => index.toString() }
        />
      </View>
    );
  }
}
