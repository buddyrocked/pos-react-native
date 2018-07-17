import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading : true }
  }

  componentDidMount(){
    return fetch(`http://192.168.20.225/point-of-sales/backend/web/v1/prices?expand=product&access-token=5OUnd1-w5xqdXvXu8fiUgC7zwW9eCmch`)
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
                    onPress={ ()=> this.props.navigation.navigate('ProductModal', {
                      id : item.product.id,
                      title : item.product.name
                    })}>
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
});
