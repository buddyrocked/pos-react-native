import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import HomeReducer from './reducer_home';
import ProductsReducer from './reducer_products';
import CartsReducer from './reducer_carts';

const rootReducer = combineReducers({
  //state: (state = {}) => state,
  home: HomeReducer,
  products: ProductsReducer,
  carts: CartsReducer,
  form: formReducer
});

export default rootReducer;
