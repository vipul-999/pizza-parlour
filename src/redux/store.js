import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Create this file next

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add more reducers here if needed
  },
});

export default store;
