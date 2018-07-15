import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native';

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading : true }
  }

  componentDidMount(){
    return fetch(`http://192.168.43.216/delucent/backend/web/v1/products?access-token=oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z`)
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={ this.state.dataSource }
          renderItem={ ({item}) =>
            <View style={ styles.itemContainer }>
              <View style={{ flex : 1, flexDirection : 'row' }}>
                <View style={ styles.itemImage }>

                </View>
                <View style={ styles.itemInfo }>
                  <Text style={{ fontWeight : 'bold' }}>{ item.sku }</Text>
                  <Text>{ item.name }</Text>
                </View>
                <View style={ styles.itemAction }>
                  <Button
                    title="Detail"
                    color="#ff5c63"
                    onPress={ ()=> this.props.navigation.navigate('ProductModal', {
                      id : item.id,
                      title : item.name
                    })}
                  />
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
  itemContainer : {
    padding : 10, backgroundColor : 'white', marginTop : 10
  },
  itemImage : {
    flex : 1,
    
  },
  itemInfo : {
    flex : 3,
  },
  itemAction : {
    flex : 1,
  },
});
