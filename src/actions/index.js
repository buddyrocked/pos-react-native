import axios from 'axios';

export const FETCH_HOME      = 'fetch_home';

export const FETCH_PRODUCTS  = 'fetch_products';
export const FETCH_PRODUCT   = 'fetch_product';

export const FETCH_CARTS     = 'fetch_carts';
export const CREATE_CART     = 'create_cart';
export const FETCH_CART      = 'fetch_cart';
export const DELETE_CART     = 'delete_cart';
export const CLEAR_CART      = 'clear_cart';

const ROOT_URL = `http://192.168.20.250/point-of-sales/backend/web/v1/`;
const API_KEY = '?access-token=5OUnd1-w5xqdXvXu8fiUgC7zwW9eCmch';

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

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}products${API_KEY}`);
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function fetchProduct(id) {
  const request = axios.get(`${ROOT_URL}/products/${id}${API_KEY}`);
  return {
    type: FETCH_PRODUCT,
    payload: request
  }
}

export function fetchCarts() {
  const request = axios.get(`${ROOT_URL}/carts${API_KEY}`);
  return {
    type: FETCH_CARTS,
    payload: request
  };
}

export function createCarts(values, callback){
  const request = axios.post(`${ROOT_URL}/carts/${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_CART,
    payload: request
  }
}

export function fetchCart() {
  const request = axios.get(`${ROOT_URL}/carts${API_KEY}`);
  return {
    type: FETCH_CART,
    payload: request
  };
}

export function deleteCart(id, callback) {
  const request = axios.delete(`${ROOT_URL}/carts/${id}${API_KEY}`)
    .then(() => callback());
  return {
    type: DELETE_CART,
    payload: id
  }
}

export function clearCart(callback) {
  const request = axios.delete(`${ROOT_URL}/carts/clear-cart${API_KEY}`)
    .then(() => callback());
  return {
    type: CLEAR_CART,
    payload: request
  }
}