import { CartActionTypes } from '../types/types';
import { CartState, CartItem } from '../types/types';

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
      
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    case 'DECREASE_QUANTITY':
    return {
        ...state,
        items: state.items.map(item =>
        item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0),
    };
      
    default:
      return state;
  }
};

export default cartReducer;
