import _ from 'lodash';
import { FETCH_STORES, FETCH_STORE } from '../actions';

export default function(state = {}, action){
  switch(action.type){
  case FETCH_STORE:
    return { ...state, [action.payload.id] : action.payload };
  case FETCH_STORES:
    return Object.assign({}, state, action.payload.data);
  default:
    return state;
  }
}
