import _ from 'lodash';
import { REPORT_INDEX } from '../actions';


export default function(state = {}, action){
  switch(action.type){
  case REPORT_INDEX:
    return Object.assign({}, state, action.payload.data);
  default:
    return state;
  }
}
