import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native';
import deviceStorage from '../services/deviceStorage';
import saveStorage from '../services/saveStorage';

export const FETCH_HOME      = 'fetch_home';

export const FETCH_PRODUCTS  = 'fetch_products';
export const FETCH_PRODUCT   = 'fetch_product';

export const FETCH_CARTS     = 'fetch_carts';
export const CREATE_CART     = 'create_cart';
export const UPDATE_CART     = 'update_cart';
export const SUBMIT_CART     = 'submit_cart';
export const FETCH_CART      = 'fetch_cart';
export const GET_CART        = 'get_cart';
export const DELETE_CART     = 'delete_cart';
export const CLEAR_CART      = 'clear_cart';

export const LOGIN           = 'login';
export const LOGOUT          = 'logout';

export const REPORT_INDEX     = 'report_index';

export const FETCH_STORES     = 'fetch_stores';
export const FETCH_STORE      = 'fetch_store';

const ROOT_URL = `http://192.168.20.250/point-of-sales/backend/web/v1/`;
//const ROOT_URL = `http://192.168.43.216/delucent/backend/web/v1/`;
//const ACCESS_TOKEN = deviceStorage.getStorage('user_token');
const ACCESS_TOKEN = 'oSIuEDLQ9Qg0j32Acp69_ofAzZtACq2z';
//const API_KEY = `?access-token=${ACCESS_TOKEN}`;

export function fetchHome() {
  const request = {
                    data : {
                              title : 'Ini Title'
                    }
                  };
  return {
    type: FETCH_HOME,
    payload: request
  }
}

export const login = (values, callback) => {
  const request = axios.post(`${ROOT_URL}auth/login`, values);

  axios.post(`${ROOT_URL}auth/login`, values)
  .then((responseJson) => {
    if(responseJson.data.token != '') {
      callback();
    } else {
      Alert.alert(responseJson.data.message);
      callback();
    }
  });

  return {
    type: LOGIN,
    payload: request
  }
}

export const logout = (callback) => {
  const request = axios.get(`${ROOT_URL}auth/logout`).then(() => callback());
  return {
    type : LOGOUT,
    payload: request
  }
}

export const fetchProducts = (page = 1, term= 'pink') => async (dispatch, getState) => {
  try {
    const TOKEN = getState().auth.token;
    const API_KEY = `?access-token=${TOKEN}`;

    let request = await axios.get(`${ROOT_URL}prices${API_KEY}&expand=product&page=${page}&term=${term}`);
    dispatch({ type: FETCH_PRODUCTS, payload: request });

    //return { type: FETCH_PRODUCTS, payload: request };
  }catch(e){
    console.log(e)
  }

}

export function fetchProduct(id) {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}products/${id}${API_KEY}`);
  return {
    type: FETCH_PRODUCT,
    payload: request
  }
}

export function fetchCarts() {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}carts${API_KEY}`);
  return {
    type: FETCH_CARTS,
    payload: request
  };
}

export function createCart(values, callback){
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.post(`${ROOT_URL}carts${API_KEY}`, values)
  .then((responseJson) => {
    Alert.alert(responseJson.data.message);
    callback();
  });

  return {
    type: CREATE_CART,
    payload: request
  }
}

export function submitCart(values, callback){
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.post(`${ROOT_URL}carts/submit${API_KEY}`, values)
  .then((responseJson) => {
    Alert.alert(responseJson.data.message);
    callback();
  });

  return {
    type: SUBMIT_CART,
    payload: request
  }
}

export function updateCart(id, values, callback){
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.put(`${ROOT_URL}carts/${id}${API_KEY}`, values)
  .then((responseJson) => {
    Alert.alert(responseJson.data.message);
    callback();
  });

  return {
    type: UPDATE_CART,
    payload: request
  }
}

export function fetchCart() {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}carts${API_KEY}`);
  return {
    type: FETCH_CART,
    payload: request
  };
}

export function getCart() {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}carts${API_KEY}`);
  return {
    type: GET_CART,
    payload: request
  };
}

export function deleteCart(id, callback) {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.delete(`${ROOT_URL}carts/${id}${API_KEY}`)
    .then(() => callback());
  return {
    type: DELETE_CART,
    payload: id
  }
}

export function clearCart(callback) {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.delete(`${ROOT_URL}carts/clear-cart${API_KEY}`)
    .then(() => callback());
  return {
    type: CLEAR_CART,
    payload: request
  }
}

export function reportIndex() {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}reports${API_KEY}`);
  return {
    type: REPORT_INDEX,
    payload: request
  };
}

export function fetchStores() {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}stores${API_KEY}`);
  return {
    type: FETCH_STORES,
    payload: request
  };
}

export function fetchStore(id) {
  const API_KEY = `?access-token=${ACCESS_TOKEN}`;

  const request = axios.get(`${ROOT_URL}stores/${id}${API_KEY}`);
  return {
    type: FETCH_STORE,
    payload: request
  };
}
