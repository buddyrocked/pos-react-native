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
import MapView from 'react-native-maps';

import { reportIndex } from '../../actions';

const KEYS_TO_FILTERS = ['order_number', 'created'];

class BranchIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible : false,
      isReady : false,
      searchTerm : '',
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
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchIndex);


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
