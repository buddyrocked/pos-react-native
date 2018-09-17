import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import _ from 'lodash';
import { connect } from 'react-redux';
import { login } from '../../actions';
import Loader from '../common/loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      route : 'Login',
      username : 'superadmin',
      password : 'superadmin',
      loading  : false,
    };
  };

  userLogin(e){
    this.setState({
      loading : true,
    });

    const values = JSON.stringify({
      username : this.state.username,
      password : this.state.password
    });

    this.props.onLogin(values, ()=>{
      this.setState({
        loading : false,
      });
    });

    e.preventDefault();
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

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
  };

  render() {
    const {showAlert} = this.state;
    return (
      <View style={{ flex : 1, backgroundColor : '#ff5c63', }}>
        <Loader loading={this.state.loading} />
        <View style={{ flex : 1, alignItems : 'center', justifyContent : 'center' }}>
          <MaterialCommunityIcons
            name="desktop-classic"
            size={100}
            color="#fff" />
          <Text style={ styles.logoText }>{ 'POINT OF SALE' }</Text>
        </View>
        <View style={{ flex : 2, paddingLeft : 20, paddingRight : 20 }}>
              <TextInput
                 style={ styles.input }
                 underlineColorAndroid={'transparent'}
                 placeholder='Username'
                 autoCapitalize='none'
                 autoCorrect={false}
                 autoFocus={true}
                 keyboardType='email-address'
                 value={this.state.username}
                 onChangeText={(text) => this.setState({ username: text })} />

              <TextInput
                  style={ styles.input }
                  underlineColorAndroid={'transparent'}
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(text) => this.setState({ password: text })} />

              <TouchableOpacity
                accessible={ true }
                style={{ flex : 1 }}
                accessibilityLabel={ 'Process' }
                onPress={ (e) => this.userLogin(e) } >
                <View style={ styles.btnLogin }>
                  <Text style={ styles.btnText }>
                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="#ff5c63" /> SIGN IN
                  </Text>
                </View>
              </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        //token: state.auth.token
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (values, callback) => { dispatch(login(values, callback)); },
    }
}

const styles = StyleSheet.create({
  btnLogin : {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  btnText : {
    fontSize:24,
    color: '#ff5c63',
    fontWeight: 'bold'
  },
  logoText : {
    textAlign : 'center',
    color : '#fff',
    fontSize  : 24,
    fontWeight : 'bold'
  },
  textMenu : {
    fontSize : 12, color : '#222', marginTop : 10
  },
  iconMenu : {
    flex : 1, alignItems : 'center', backgroundColor : '#fff', justifyContent : 'center', borderColor : '#fff', borderWidth : 1, margin: 5
  },
  input : {
    borderColor : '#fff',
    borderRadius : 5,
    borderWidth : 1,
    color : '#fff',
    padding : 10,
    marginBottom : 20
  },
  slideContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
