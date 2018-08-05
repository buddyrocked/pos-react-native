import _ from 'lodash';
import { CREATE_CART } from '../actions';

export default function(state = {}, action){
  switch(action.type){
  case CREATE_CART:
    return Object.assign({}, state, {});
  default:
    return state;
  }
}
