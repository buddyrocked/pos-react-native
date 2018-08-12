import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import HomeReducer from './reducer_home';
import ProductsReducer from './reducer_products';
import CartsReducer from './reducer_carts';
import AuthReducer from './reducer_auth';
import CartReducer from './reducer_cart';
import CreateCartReducer from './reducer_create_cart';
import ReportReducer from './reducer_reports';
import StoreReducer from './reducer_stores';

const rootReducer = combineReducers({
  //state: (state = {}) => state,
  home: HomeReducer,
  products: ProductsReducer,
  carts: CartsReducer,
  cart: CartReducer,
  create_cart: CreateCartReducer,
  form: formReducer,
  auth: AuthReducer,
  reports: ReportReducer,
  stores: StoreReducer
});

export default rootReducer;
