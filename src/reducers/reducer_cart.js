import _ from 'lodash';
import { GET_CART } from '../actions';
const defaultState = {
  items      : [],
  count      : 0,
  total      : 0,
  total_text : '',
  terbilang  : '',
}

export default function(state = defaultState, action){
  switch(action.type){
  case GET_CART:
    //console.warn(action.payload.data);
    return Object.assign({}, state, action.payload.data);
  default:
    return state;
  }
}
