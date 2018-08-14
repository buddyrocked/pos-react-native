import React, { Component } from 'react';
import { Alert, Button, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit';
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme, VictoryLine } from "victory-native";
import { FloatingAction } from 'react-native-floating-action';

import { getCart, fetchHome, logout } from '../actions';

const dataVictory = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false };
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

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  };

  componentDidMount(){
    //this.props.fetchHome();
  }

  userLogout(e) {
    this.props.onLogout(() => {
      this.props.onGetCart();
    });
    e.preventDefault();
  }

  render() {
    const {showAlert} = this.state;
    const grapWidth = Dimensions.get('window').width - 20;
    const data = [
      { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];

    const actions = [{
      text: 'Create Order',
      icon: require('../assets/images/add.png'),
      name: 'Products',
      position: 1,
      color: '#ff5c63'
    }];

    return (
      <View style={{ flex : 1}}>
        <ScrollView>
          <View>
            <View style={{ backgroundColor : '#fff', alignItems : 'center', margin : 10, marginBottom : 5  }}>
                <LineChart
                  data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ]
                    }]
                  }}
                  width={ grapWidth } // from react-native
                  height={240}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fc858a',
                    backgroundGradientTo: '#ff5c63',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 0
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 0,
                    borderRadius: 0
                  }}
                />
              <View style={{ flexDirection : 'row' }}>
                <View style={{ flex : 1, padding : 10 }}>
                  <Text style={{ fontSize : 10, color : '#666', textAlign : 'center' }}>Order</Text>
                  <Text style={{ fontSize : 14, color : '#333', fontWeight : 'bold', textAlign : 'center' }}>63</Text>
                </View>
                <View style={{ flex : 3, padding : 10 }}>
                  <Text style={{ fontSize : 10, color : '#666', textAlign : 'center' }}>Transactions</Text>
                  <Text style={{ fontSize : 14, color : '#333', fontWeight : 'bold', textAlign : 'center' }}>Rp.7.850.000,-</Text>
                </View>
                <View style={{ flex : 1, padding : 10 }}>
                  <TouchableOpacity
                    style={{ flex : 1 }}
                    accessible={ true }
                    accessibilityLabel={ 'Tap Me' }
                    onPress={ ()=> this.props.navigation.navigate('Products') }>
                    <View style={{ flex : 1, backgroundColor : '#e0e0e0', borderRadius : 5, justifyContent: 'center' }}>
                      <Text
                        style={{ color:'#444', textAlign : 'center' }}>{ 'Refresh' }</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ margin : 10, marginTop : 5 }}>
              <View style={{ flex : 1, flexDirection : 'row' }}>
                <View style={{ backgroundColor : '#fff', flex : 1, flexDirection : 'row', height : 80, alignItems : 'center', justifyContent : 'center', marginRight : 5, borderWidth : 1, borderColor : '#fff', borderRadius : 4 }}>
                  <View style={{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={30}
                      color="#999" />
                  </View>
                  <View style={{ flex : 2 }}>
                    <Text style={{ fontSize : 36, color : '#ff5c63', fontWeight : 'bold' }}>100</Text>
                    <Text style={{ fontSize : 12, color : '#999' }}>Transactions</Text>
                  </View>
                </View>
                <View style={{ backgroundColor : '#fff', flex : 1, flexDirection : 'row', height : 80, alignItems : 'center', justifyContent : 'center', marginLeft : 5, borderWidth : 1, borderColor : '#fff', borderRadius : 4 }}>
                  <LineChart
                    data={{
                      labels: ['1', '2', '3', '4', '5', '6'],
                      datasets: [{
                        data: [
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10
                        ]
                      }]
                    }}
                    width={120}
                    height={80}
                    chartConfig={{
                      backgroundColor: '#fff',
                      backgroundGradientFrom: '#fff',
                      backgroundGradientTo: '#fff',
                      color: '(opacity = 1) => `#f0f0f0`',
                      style: {
                        borderRadius: 0
                      }
                    }}
                    style={{
                      marginVertical: 0,
                      borderRadius: 0,
                      flex : 1
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ margin : 10, marginTop : 0 }}>
              <BarChart
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ]
                  }]
                }}
                width={ grapWidth } // from react-native
                height={170}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#ff5c63',
                  backgroundGradientTo: '#fc858a',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 0
                  }
                }}
                style={{
                  marginVertical: 0,
                  borderRadius: 0,
                  height : 170
                }}
                />
            </View>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Information"
              message="Are you sure want to continue?"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="No, Cancel"
              confirmText="Yes, Do it"
              confirmButtonColor="#ff5c63"
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.props.navigation.navigate('Products');
                this.hideAlert();
              }}
            />
          </View>
        </ScrollView>
        <FloatingAction
          actions={actions}
          color="#ff5c63"
          onPressItem={
            (name) => {
              this.props.navigation.navigate(name)
            }
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    home: state.home,
    username: state.auth.username
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (callback) => { dispatch(logout(callback)); },
        onGetCart: () => { dispatch(getCart()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  textMenu : {
    fontSize : 12, color : '#222', marginTop : 10
  },
  iconMenu : {
    flex : 1, alignItems : 'center', backgroundColor : '#fff', justifyContent : 'center', borderColor : '#fff', borderWidth : 1, margin: 5
  }
});
