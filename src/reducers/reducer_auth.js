import { LOGOUT, LOGIN } from '../actions';
const defaultState = {
  token    : '',
  user_id  : '',
  username : '',
  password : ''
}

export default function(state = defaultState, action){
  switch (action.type) {
      case LOGIN:
          return Object.assign({}, state, action.payload.data);
      case LOGOUT:
          // return Object.assign({}, state, {
          //     token: '',
          //     user_id: '',
          //     username: '',
          //     password: ''
          // });
          return Object.assign({}, state, action.payload.data);
      default:
          return state;
  }
}
