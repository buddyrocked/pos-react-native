import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, Text } from 'react-native';

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
            <View style={{ height : 100, padding : 10, backgroundColor : 'white', marginTop : 5 }}>
              <View>
                <Text style={{ fontWeight : 'bold' }}>{ item.sku }</Text>
                <Text>{ item.name }</Text>
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
          }
          keyExtractor={ (item, index) => index.toString() }
        />
      </View>
    );
  }
}
