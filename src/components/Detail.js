import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, Text } from 'react-native';

export default class Detail extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading : true }
  }

  componentDidMount(){
    return fetch('http://192.168.0.203/point-of-sales/backend/web/v1/product?access-token=oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading : false,
          dataSource : responseJson.items,
        }, function(){

        });
      })
      .catch((error) => {
        Alert.alert('error');
        console.log(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{ flex : 1, padding : 20, justifyContent : 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return(
      <View style={{ flex: 1}}>
        <FlatList
          data={ this.state.dataSource }
          renderItem={ ({item}) =>
            <View style={{ height : 100, padding : 10, backgroundColor : 'steelblue' }}>
              <View>
                <Text style={{ color : 'white', fontWeight : 'bold' }}>{ item.sku }</Text>
                <Text>{ item.name }</Text>
              </View>
              <View>
                <Button
                  title="Detail"
                  onPress={ ()=> this.props.navigation.navigate('Network')}
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
