import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem, OrderStatus, User } from '../../types';
import { Order } from '../../types/order.types';


export interface OrderState {
    cart: Order
}


const initialState: OrderState = {
    cart: {
        items: [],
    }
};

export const orderSlice = createSlice({
    initialState,
    name: 'orderSlice',
    reducers: {
        loadCart: (state) => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                state.cart.items = JSON.parse(cart) as InventoryItem[]
                console.log(current(state))
            }
            else {
                state.cart.items = []
            }
        },
        addToCart: (state, action: PayloadAction<string>) => {
            // insert only if not already in cart
            if (state.cart.items?.find((item) => item.item_id === action.payload)) return;

            state.cart.items?.push({
                item_id: action.payload,
                quantity: 1,
            });
            localStorage.setItem('cart', JSON.stringify(state.cart.items));
        }
    },
});

export default orderSlice.reducer;

export const { addToCart, loadCart } = orderSlice.actions;