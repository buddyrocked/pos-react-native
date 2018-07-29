import _ from 'lodash';
import { GET_CART } from '../actions';

export default function(state = {}, action){
  switch(action.type){
  case GET_CART:
    return action.payload.data;
  default:
    return state;
  }
}
