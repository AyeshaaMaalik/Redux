import { createStore, combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cartReducer,
});

const store = createStore(rootReducer);

export default store;
