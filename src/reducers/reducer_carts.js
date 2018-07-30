import _ from 'lodash';
import { FETCH_CARTS, FETCH_CART, DELETE_CART, CLEAR_CART } from '../actions';

const defaultState = {
  items      : [],
  count      : 0,
  total      : 0,
  total_text : '',
  terbilang  : '',
}

export default function(state = {}, action){
  switch(action.type){
  case DELETE_CART:
    return _.omit(state, action.payload);
  case CLEAR_CART:
    return _.omit(state, action.payload);
  case FETCH_CART:
    return action.payload.data;
  case FETCH_CARTS:
    //return action.payload.data;
    return Object.assign({}, state, action.payload.data);
  default:
    return state;
  }
}
