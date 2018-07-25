import _ from 'lodash';
import { CREATE_CART, FETCH_CARTS, FETCH_CART, DELETE_CART, CLEAR_CART } from '../actions';

export default function(state = {}, action){
  switch(action.type){
  case DELETE_CART:
    return _.omit(state, action.payload);
  case CLEAR_CART:
      return _.omit(state, action.payload);
  case CREATE_CART:
      return _.omit(state, action.payload);
  case FETCH_CART:
    return action.payload.data;
  case FETCH_CARTS:
    return action.payload.data;
  default:
    return state;
  }
}
