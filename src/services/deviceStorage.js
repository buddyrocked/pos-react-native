import { AsyncStorage } from 'react-native';

const deviceStorage = {
  async getItem(key) {
    try {
      var value = await AsyncStorage.getItem('user_token');
      return value;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
}

export default deviceStorage;
