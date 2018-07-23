import _ from 'lodash';
import { HOME } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
  case HOME:
    return action.payload.data;
  default:
    return state;
  }
}
