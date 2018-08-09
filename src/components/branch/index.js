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
import MapView, { Marker, Callout } from 'react-native-maps';

import { reportIndex } from '../../actions';

const KEYS_TO_FILTERS = ['title', 'description'];

class BranchIndex extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible    : false,
      isReady    : false,
      searchTerm : '',
      markers : [
        {
          id: 1,
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324
          },
          title: 'Pondok Ranji',
          description: 'This is test marker'
        },
        {
          id: 2,
          latlng: {
            latitude: 37.78895,
            longitude: -122.4394
          },
          title: 'Pondok Pinang',
          description: 'This is test marker 1'
        },
        {
          id: 3,
          latlng: {
            latitude: 37.78195,
            longitude: -122.4194
          },
          title: 'Gunung Sindur',
          description: 'This is test marker 2'
        }
      ],
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
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

  regionContainingPoints(points) {
    var minX, maxX, minY, maxY;

    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    var midX = (minX + maxX) / 2;
    var midY = (minY + maxY) / 2;
    var midPoint = [midX, midY];

    var deltaX = (maxX - minX);
    var deltaY = (maxY - minY);

    return {
      latitude: midX, longitude: midY,
      latitudeDelta: deltaX, longitudeDelta: deltaY,
    };
  }

  componentDidMount(){

    this.setState({
      isReady : true,
    });
  }

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    let filteredData;
    if(_.isEmpty(this.state.markers)){
      filteredData = [].filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    }else{
      filteredData = this.state.markers.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
    }

    let regions = this.regionContainingPoints([{latitude: parseFloat(106.748596), longitude: parseFloat(-6.282944)}]);

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
            customMapStyle={mapStyle}
            region={this.state.region}
          >
            {filteredData.map(marker => (
              <Marker
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                key={marker.id}
                draggable
                image={require('../../assets/images/home.png')}
              >
                <Callout>
                  <View>
                    <View style={{ height: 120, width: 120, justifyContent: 'center' }}>
                      <Text style={{ textAlign: 'center' }}>Photo</Text>
                    </View>
                    <View style={{ height: 40, width: 120, backgroundColor: '#fff', flex: 1, flexDirection: 'row'}}>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                          name="bank"
                          size={24}
                          color="#ff5c63" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                          name="phone"
                          size={24}
                          color="#ff5c63" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={24}
                          color="#ff5c63" />
                      </View>
                    </View>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
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

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#e25863"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e25863"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];
