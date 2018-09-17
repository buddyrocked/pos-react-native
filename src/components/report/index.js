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

import { reportIndex } from '../../actions';

const KEYS_TO_FILTERS = ['order_number', 'created'];

class ReportIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible : false,
      isReady : false,
      searchTerm : '',
      page : 1,
      nextPage : 1,
      previousPage : 1,
    }
  }

  static defaultProps = {
    reports: []
  }

  searchUpdated(term) {
    this.setState({
      searchTerm: term,
    });
  }


  ListEmptyView = () => {
    return (
        <Text style={{textAlign: 'center'}}> Cart Is Empty </Text>
    );
  }

  componentDidMount(){
    //this.props.onReportIndex();

    this.setState({
      isReady : true,
    });
  }

  render() {
    let filteredData;
    if(_.isEmpty(this.props.reports)){
      filteredData = [].filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    }else{
      filteredData = this.props.reports.items.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    }

    if(this.props.reports.length == 0){
      return(
        <View style={{ flex : 1, padding : 20, justifyContent : 'center', alignItems : 'center' }}>
          <MaterialCommunityIcons
            name="cart-off"
            size={72}
            color="#ff5c63" />
          <Text style={{textAlign: 'center'}}> There is no transactions for today.</Text>
        </View>
      );
    }

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
            <SearchInput style={ styles.input } placeholder='Search Data' underlineColorAndroid={'transparent'}
            onChangeText={(term) => { this.searchUpdated(term) }} />
          </View>
        </View>
        <View style={{ flex : 8 }}>
          <ScrollView>
            <FlatList
              data={ filteredData }
              extraData={this.props}
              renderItem={ ({item}) =>
                <View style={ styles.itemContainer }>
                  <View style={{ flex : 1, flexDirection : 'row' }}>
                    <View style={ styles.itemInfo }>
                      <Text style={ styles.itemInfoCode }>{ item.order_number }</Text>
                      <Text style={ styles.itemInfoName }>{ item.created }</Text>
                      <Text style={ styles.itemInfoPrice }>
                        { item.grand_total }
                      </Text>
                    </View>
                    <View style={ styles.itemAction }>
                      <TouchableOpacity
                        style={{ flex : 1 }}
                        accessible={ true }
                        accessibilityLabel={ 'Tap Me' }
                        onPress={ () => this.openCart(item.id) }>
                        <View style={ styles.itemIcon }>
                          <Text style={{ color : '#fff' }}>DETAIL</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              }
              keyExtractor={ (item, index) => index.toString() }
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    reports: state.reports
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReportIndex: () => { dispatch(reportIndex()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportIndex);


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
    color : '#777',
    fontSize : 10
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
