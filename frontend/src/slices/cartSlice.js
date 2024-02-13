import { createSlice } from '@reduxjs/toolkit';

const cartLs = localStorage.getItem("cart");
const initialState = cartLs ? JSON.parse(cartLs) : { cartItems: [] };

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(x => x._id === item.id);

            if (existingItem) {
                state.cartItems = state.cartItems.map(x =>
                    x._id === existingItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            // calculate item price
            state.itemPrice = addDecimals(
                state.cartItems.reduce((acc, item) => {
                    return acc + item.price * item.qty;
                }, 0)
            );

            // calculate shipping price
            state.shippingPrice = addDecimals(
                state.itemPrice > 100 ? 0 : 10
            );

            // calculate tax price 15%
            state.taxPrice = addDecimals(
                Number((0.15 * state.itemPrice).toFixed(2))
            );

            // calculate total price
            state.totalPrice = (
                Number(state.itemPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state))
        }
    }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;