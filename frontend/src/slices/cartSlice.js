import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const cartLs = localStorage.getItem("cart");
const initialState = cartLs ? JSON.parse(cartLs) : { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            return updateCart(state, action);
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;