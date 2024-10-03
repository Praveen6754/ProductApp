import { createStore } from 'redux';
import cartReducer from '../redux/reducer';

const store = createStore(cartReducer);

export default store;