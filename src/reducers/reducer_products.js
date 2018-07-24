import _ from 'lodash';
import { FETCH_PRODUCTS, FETCH_PRODUCT } from '../actions';

export default function(state = {}, action){
  switch(action.type){
  case FETCH_PRODUCT:
    return { ...state, [action.payload.id] : action.payload };
  case FETCH_PRODUCTS:
    return action.payload.data;
  default:
    return state;
  }
}
