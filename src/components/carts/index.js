import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import _ from 'lodash';
import { connect } from 'react-redux';
import Placeholder from 'rn-placeholder';
import SlidingUpPanel from 'rn-sliding-up-panel';

import Loader from '../common/loader';
import { fetchCarts, deleteCart, clearCart, updateCart } from '../../actions';

class Carts extends Component {
  constructor(props){
    super(props);
    this.setCartId = this.setCartId.bind(this);
    this.state = {
      isReady : false,
      id : 0,
      visible : false,
      qty : 1,
      loading : false
    };
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

  updateQty = (qty) => {
    this.setState({
      qty : qty
    });
  }

  updateCart () {
    this.setState({
      loading : true,
    });

    let values = JSON.stringify({
      value: parseInt(this.state.qty),
    });

    this.props.onUpdateCart(this.state.id, values, () => {
      this.setState({
        visible : false,
        id : 0,
        qty : 1,
        loading : false
      });
      this.props.onFetchCarts();
    });
  }

  setCartId(id, qty){
    this.setState({
      visible : true,
      id : id,
      qty : qty
    });
  }

  confirmDelete(){
    this.showAlert();
  }

  eventDeleteCart(e){
    this.setState({
      loading : true,
    });

    this.props.onDeleteCart(this.state.id, () => {
      this.setState({
        visible : false,
        loading : false
      });
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
        <Loader loading={this.state.loading} />
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
                        onPress={ () => this.setCartId(item.id, item.quantity) }>
                        <View style={ styles.itemIcon }>
                          <Text style={{ color : '#fff' }}>EDIT</Text>
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
            <TouchableOpacity
              style={{ flex : 1 }}
              accessible={ true }
              accessibilityLabel={ 'Remove Cart' }
              onPress={ () => this.props.navigation.navigate('Cart') }>
              <View style={ styles.checkoutButton }>
                <Text style={{ color : '#fff' }}>CHECKOUT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <SlidingUpPanel
          height={ 100 }
          showBackdrop={ false }
          draggableRange={{top: 175, bottom: 0}}
          visible={this.state.visible}
          onRequestClose={() => this.setState({ visible: false })}>
          <View style={styles.slideContainer}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Close cart' }
                onPress={() => this.setState({visible: false})}>
                <View style={{ backgroundColor : '#ff5c63', flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                  <MaterialCommunityIcons
                    name="close-circle-outline"
                    size={30}
                    color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TextInput value={ `${this.state.qty}` } style={ styles.inputQty } onChangeText={ (qty) => this.updateQty(qty) } placeholder='Qty' underlineColorAndroid={'transparent'} keyboardType='numeric' />
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'update to cart' }
                onPress={() => this.updateCart()}>
                <View style={{ backgroundColor : '#ff5c63', flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={30}
                    color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'delete cart' }
                onPress={() => this.confirmDelete()}>
                <View style={{ backgroundColor : '#ff2e37', flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={30}
                    color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SlidingUpPanel>
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
    onUpdateCart: (id, values, callback) => { dispatch(updateCart(id, values, callback)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carts);


const styles = StyleSheet.create({
  itemIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#ff5c63',
    borderRadius : 5,
    height: 40
  },
  checkoutButton : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#ff5c63',
    borderRadius : 5,
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
  },
  slideContainer: {
    flex: 1,
    flexDirection : 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding : 20
  },
  inputQty : {
    backgroundColor : '#fff',
    color : '#000',
    borderColor : '#666',
    borderRadius : 4,
    height : 60,
    padding : 10,
    textAlign : 'center'
  }
});
