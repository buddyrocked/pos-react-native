import _ from 'lodash';
import { CREATE_CART } from '../actions';
const defaultState = {
  items      : [],
  count      : 0,
  total      : 0,
  total_text : '',
  terbilang  : '',
}

export default function(state = {}, action){
  switch(action.type){
  case CREATE_CART:
    return Object.assign({}, state, action.payload.data);
  default:
    return state;
  }
}
