import _ from 'lodash';
import { FETCH_HOME } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
  case FETCH_HOME:
    return action.payload.data;
  default:
    return state;
  }
}
