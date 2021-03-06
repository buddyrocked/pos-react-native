import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, Text } from 'react-native';

export default class Product extends Component {
  constructor(props){
    super(props);
    this.state = { isLoading : true }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title : navigation.getParam('title'),
    }
  };

  componentDidMount(){
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');

    return fetch(`http://192.168.20.225/point-of-sales/backend/web/v1/products/${id}?access-token=5OUnd1-w5xqdXvXu8fiUgC7zwW9eCmch`)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.code == 0){
          Alert.alert(responseJson.message);
        } else {
          this.setState({
            isLoading : false,
            productDetail : responseJson
          }, function(){
            this.props.navigation.setParams({title: responseJson.name });
          });
        }
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
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return(
      <View style={{ flex: 1, alignItems : 'center', justifyContent : 'center'}}>
        <Text style={{ fontWeight : 'bold' }}>Product Detail</Text>
        <Text style={{ fontWeight : 'bold' }}>{ this.state.productDetail.name }</Text>
        <Text style={{ fontWeight : 'bold' }}>{ this.state.productDetail.sku }</Text>
        <Button
          title="Go back"
          color="#ff5c63"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
