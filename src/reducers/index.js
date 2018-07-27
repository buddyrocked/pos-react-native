import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import HomeReducer from './reducer_home';
import ProductsReducer from './reducer_products';
import CartsReducer from './reducer_carts';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
  //state: (state = {}) => state,
  home: HomeReducer,
  products: ProductsReducer,
  carts: CartsReducer,
  form: formReducer,
  auth: AuthReducer
});

export default rootReducer;
