import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import _ from 'lodash';
import { connect } from 'react-redux';
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
    return (
      <View style={{ flex : 1 }}>
        <View style={{ flex : 1, backgroundColor : '#ff5c63', alignItems : 'center', justifyContent : 'center' }}>
        <MaterialCommunityIcons
          name="android"
          size={72}
          color="#fff" />
          <Text>{` `}</Text>
        </View>
        <View style={{ flex : 2, backgroundColor : '#f0f0f0', padding : 5 }}>
          <View style={{ flex : 1, flexDirection : 'row' }}>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> this.props.navigation.navigate('Products') }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="cart-outline"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Order' }</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex : 1 }}>
              <TouchableOpacity
                style={{ flex : 1 }}
                accessible={ true }
                accessibilityLabel={ 'Tap Me' }
                onPress={ ()=> {
                  this.showAlert();
                } }>
                <View style={ styles.iconMenu }>
                  <MaterialCommunityIcons
                    name="dropbox"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Stock' }</Text>
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
                    name="cash-multiple"
                    size={42}
                    color="#ff5c63" />
                  <Text
                    style={ styles.textMenu }>{ 'Audit' }</Text>
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
