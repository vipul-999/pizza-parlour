// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { name, price } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.name === name);

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      // Save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(item => item.name === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }

      // Save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity: (state, action) => {
      const index = state.cart.findIndex(item => item.name === action.payload);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      }

      // Save cart to local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    // ... (other actions)
  },
});

export const { addToCart, removeFromCart, increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
