export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

export interface RootState {
    cart: CartState;
}

export type CartActionTypes =
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: Product }
    | { type: 'DECREASE_QUANTITY'; payload: Number };


