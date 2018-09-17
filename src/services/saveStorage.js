import { AsyncStorage } from 'react-native';

const saveStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
              .then(
                () => AsyncStorage.getItem(key)
                .then(
                  (result)=> {/*console.warn(result)*/}
                )
            );
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
}

export default saveStorage;
