import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, Image, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-native-search-filter';
import Placeholder from 'rn-placeholder';
import SlidingUpPanel from 'rn-sliding-up-panel';

import { fetchProducts, createCart, getCart } from '../../actions';
import prices from '../../data/products';

const KEYS_TO_FILTERS = ['sku', 'name'];

class Products extends Component {

  constructor(props){
    super(props);
    this.state = { showAlert: false };
    this.addToCart = this.addToCart.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      visible : false,
      isReady : false,
      id : 0,
      qty : 1,
      text : '',
      message : '',
      confirmText : 'Oke',
      searchTerm : '',
      page : 1,
      nextPage : 1,
      previousPage : 1,
    }
  }

  static defaultProps = {
    products: []
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term,
    });

    this.props.onFetchProducts(1, this.state.searchTerm);
  }

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

  openCart(productId){
    this.setState({
      visible : true,
      id : productId,
      qty : 1
    });
  }

  updateQty = (qty) => {
    this.setState({
      qty : qty
    });
  }

  addToCart () {
    let values = JSON.stringify({
      id: parseInt(this.state.id),
      value: parseInt(this.state.qty),
    });

    this.props.onCreateCart(values, () => {
      this.setState({
        visible : false,
        id : 0,
        qty : 1,
      });
    });
  }

  ListEmptyView = () => {
    return (
        <Text style={{textAlign: 'center'}}> Cart Is Empty </Text>
    );
  }

  componentDidMount(){
    this.props.onFetchProducts(this.state.page, this.state.searchTerm);
    let nextPage, currentPage;
    if(_.isEmpty(this.props.products)){
      nextPage = 2;
      previousPage = 0;
    } else {
      nextPage = this.props.products._meta.currentPage + 1;
      previousPage = this.props.products._meta.currentPage - 1;
    }

    this.setState({
      isReady : true,
      nextPage : nextPage,
      previousPage : previousPage
    });
  }

  changePage(page){
    this.setState({
      isReady : false,
      page : page
    });

    this.props.onFetchProducts(page, this.state.searchTerm);

    let nextPage, currentPage;
    if(_.isEmpty(this.props.products)){
      nextPage = 2;
      previousPage = 0;
    } else {
      nextPage = this.props.products._meta.currentPage + 1;
      previousPage = this.props.products._meta.currentPage - 1;
    }

    this.setState({
      isReady : true,
      nextPage : nextPage,
      previousPage : previousPage
    });
  }

  render() {


    return(
      <View style={ styles.listContainer }>
        <View style={{ flex : 1, flexDirection : 'row' }}>
          <View style={{ flex : 2, justifyContent : 'center', alignItems : 'center' }}>
            <MaterialCommunityIcons
              name="magnify-minus-outline"
              size={30}
              color="#ff5c63" />
          </View>
          <View style={{ flex : 8 }}>
            <TextInput style={ styles.input } placeholder='Search Products' underlineColorAndroid={'transparent'}
            onChangeText={ _.debounce((term) => { this.searchUpdated(term) }, 300) } />
          </View>
        </View>
        <View style={{ flex : 8 }}>
          <ScrollView>
            <FlatList
              data={ this.props.products.items }
              extraData={this.props}
              renderItem={ ({item}) =>
                <View style={ styles.itemContainer }>
                  <Placeholder.ImageContent
                    size={60}
                    animate="fade"
                    lineNumber={4}
                    lineSpacing={5}
                    lastLineWidth="30%"
                    onReady={this.state.isReady}
                  >
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
                          onPress={ () => this.openCart(item.id) }>
                          <View style={ styles.itemIcon }>
                            <Text style={{ color : '#fff' }}>BUY</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Placeholder.ImageContent>
                </View>
              }
              keyExtractor={ (item, index) => index.toString() }
            />
          </ScrollView>
        </View>
        <View style={{ flex : 1, flexDirection : 'row' }}>
          <View style={{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Previous' }
                onPress={ () => this.changePage(this.state.previousPage) }>
                <View  style={{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={30}
                    color="#ff5c63" />
                </View>
              </TouchableOpacity>
          </View>
          <View style={{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <TouchableOpacity
              style={{ flex : 1 }}
              accessible={ true }
              accessibilityLabel={ 'Next' }
              onPress={ () => this.changePage(this.state.nextPage) }>
              <View  style={{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={30}
                  color="#ff5c63" />
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
                    name="chevron-down"
                    size={30}
                    color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TextInput value={`${this.state.qty}`} style={ styles.inputQty } onChangeText={ (qty) => this.updateQty(qty) } placeholder='Qty' underlineColorAndroid={'transparent'} keyboardType='numeric' />
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Add to cart' }
                onPress={() => this.addToCart()}>
                <View style={{ backgroundColor : '#ff5c63', flex : 1, alignItems : 'center', justifyContent : 'center' }}>
                  <MaterialCommunityIcons
                    name="plus-circle-outline"
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
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, Cancel"
          confirmText={this.state.confirmText}
          confirmButtonColor="#ff5c63"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products,
    create_cart : state.create_cart
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProducts: (page, term) => { dispatch(fetchProducts(page, term)); },
        onCreateCart: (values, callback) => { dispatch(createCart(values, callback)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);


const styles = StyleSheet.create({
  itemIcon : {
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#ff5c63',
    borderRadius : 5,
    height: 40
  },
  listContainer : {
    backgroundColor : '#fff',
    flex : 1,
    margin : 0
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
    justifyContent : 'center'
  },
  input : {
    paddingTop : 20,
    paddingBottom : 20,
    paddingLeft : 20,
    paddingRight : 20,
    fontSize : 16,
    fontWeight : 'bold'
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
