import { AsyncStorage } from 'react-native';

const deviceStorage = {
  async getStorage(key){
    var value = await AsyncStorage.getItem(key);
    return value;
  }
}

export default deviceStorage;
