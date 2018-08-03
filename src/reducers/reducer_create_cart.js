import _ from 'lodash';
import { CREATE_CART } from '../actions';
const defaultState = {
  items      : [],
  count      : 100,
  total      : 0,
  total_text : '',
  terbilang  : '',
}

export default function(state = defaultState, action){
  switch(action.type){
  case CREATE_CART:
    //console.warn(action.payload.data);
    return Object.assign({}, state, action.payload.data);
    // return Object.assign({}, state, {
    //   items      : [],
    //   count      : 101,
    //   total      : 0,
    //   total_text : '',
    //   terbilang  : '',
    // });
  default:
    return state;
  }
}
