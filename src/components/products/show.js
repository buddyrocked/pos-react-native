import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, StyleSheet, Text } from 'react-native';

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

    const url = global.url;
    const access_token = global.access_token;

    return fetch(`${url}products/${id}?access-token=${access_token}`)
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
      <View style={ styles.productContainer }>
        <View style={ styles.productImage }>

        </View>
        <View style={ styles.productInfo }>
          <Text style={ styles.productInfoText }>Product Detail</Text>
          <Text style={ styles.productInfoText }>{ this.state.productDetail.name }</Text>
          <Text style={ styles.productInfoText }>{ this.state.productDetail.sku }</Text>
        </View>
        <View style={ styles.productAction }>
          <Button
            title="Add To Cart"
            color="#ff5c63"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  productContainer : {
    flex : 1,
    padding : 20,
    backgroundColor : '#f0f0f0'
  },
  productImage : {
    flex : 4,
    backgroundColor : '#e3e3e3'
  },
  productImageImg : {
    flex : 1,
  },
  productInfo : {
    flex : 3,
    marginTop : 20,
  },
  productAction : {
    flex : 1,
  }
})
