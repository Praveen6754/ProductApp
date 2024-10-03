import { Product } from '../types/types';

export const addToCart = (product: Product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (product: Product) => ({
  type: 'REMOVE_FROM_CART',
  payload: product,
});

export const decreaseQuantity = (productId: number) => ({
    type: 'DECREASE_QUANTITY',
    payload: productId,
  });