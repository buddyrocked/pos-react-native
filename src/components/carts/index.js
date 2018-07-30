import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import _ from 'lodash';
import { connect } from 'react-redux';
import Placeholder from 'rn-placeholder';

import { fetchCarts, deleteCart, clearCart } from '../../actions';

class Carts extends Component {
  constructor(props){
    super(props);
    this.setCartId = this.setCartId.bind(this);
    this.state = { isReady : false, id : 0 };
  }

  componentDidMount(){
    this.props.onFetchCarts();
    this.setState({
      isReady : true,
    });
  }

  static navigationOptionsx = ({ navigation }) => {
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
            this.props.onClearCart(() => {
              Alert.alert('Shopping cart has empty.');
              this.props.onFetchCarts();
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
    this.setState({
      id: id
    });
    this.showAlert();
  }

  eventDeleteCart(e){
    this.props.onDeleteCart(this.state.id, () => {
      this.props.onFetchCarts();
      this.hideAlert();
    });

    e.preventDefault();
  }

  ListEmptyView = () => {
    return (
      <View style={{ flex : 1, justifyContent : 'center' }}>
        <Text style={{textAlign: 'center'}}> Cart Is Empty</Text>
      </View>
    );
  }

  render() {

    if(this.props.carts.count == 0){
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
            data={ this.props.carts.items }
            renderItem={ ({item}) =>
              <View style={ styles.itemContainer }>
                <Placeholder.ImageContent
                  size={60}
                  animate="fade"
                  lineNumber={4}
                  lineSpacing={5}
                  lastLineWidth="30%"
                  color="#d0d0d0"
                  onReady={this.state.isReady}
                >
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
                </Placeholder.ImageContent>
              </View>
            }
            keyExtractor={ (item, index) => index.toString() }
            ListEmptyComponent={ this.ListEmptyComponent }
          />
        </View>
        <View style={ styles.actionContainer }>
          <Placeholder.Paragraph
            lineNumber={2}
            textSize={16}
            lineSpacing={5}
            color="#d0d0d0"
            width="100%"
            lastLineWidth="90%"
            firstLineWidth="30%"
            animate="fade"
            onReady={this.state.isReady}
            >
            <View style={{ flex : 1 }}>
              <Text style={ styles.actionMoney }><MaterialCommunityIcons name="tag-multiple" size={12} color="#ff5c63" /> { this.props.carts.total }</Text>
              <Text style={ styles.actionSpell }><MaterialCommunityIcons name="volume-high" size={12} color="#ff5c63" /> { this.props.carts.terbilang }</Text>
            </View>
          </Placeholder.Paragraph>
          <View style={{ flex : 1, marginTop : 10 }}>
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
          onConfirmPressed={(e) => {
            this.eventDeleteCart(e);
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state){
  return { carts: state.carts };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClearCart : (callback) => { dispatch(clearCart(callback)); },
    onFetchCarts : () => { dispatch(fetchCarts()); },
    onDeleteCart : (id, callback) => { dispatch(deleteCart(id, callback)); },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carts);


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
