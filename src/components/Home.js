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
} from 'react-native-chart-kit'

import { getCart, fetchHome, logout } from '../actions';

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
    return (
      <View style={{ flex : 1, backgroundColor : '#fff' }}>
        <View style={{ flex : 1, backgroundColor : '#fff', alignItems : 'center', justifyContent : 'center', margin : 10  }}>
          <View style={{ flex : 4 }}>
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
                marginVertical: 8,
                borderRadius: 0
              }}
            />
          </View>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <Text style={{ fontSize : 10, color : '#666', textAlign : 'center' }}>Order</Text>
              <Text style={{ fontSize : 14, color : '#333', fontWeight : 'bold', textAlign : 'center' }}>63</Text>
            </View>
            <View style={{ flex : 2 }}>
              <Text style={{ fontSize : 10, color : '#666', textAlign : 'center' }}>Transactions</Text>
              <Text style={{ fontSize : 14, color : '#333', fontWeight : 'bold', textAlign : 'center' }}>Rp.7.850.000,-</Text>
            </View>
          </View>
        </View>
        <View style={{ flex : 1, backgroundColor : '#f0f0f0', padding : 5 }}>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="chart-areaspline"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Sales Report' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="wallet"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Profit' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="twitch"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Message' }</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="account-card-details"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Customers' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="source-branch"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Branch' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={(e) => this.userLogout(e)}>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="logout"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Logout' }</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
