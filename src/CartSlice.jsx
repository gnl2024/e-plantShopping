import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize cart as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name); // FIX: Use `name` instead of `id`
      if (existingItem) {
        existingItem.quantity++; // Increase quantity if item exists
      } else {
        state.items.push({ ...item, quantity: 1 }); // Add item with quantity 1
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter((i) => i.name !== item.name); // Remove item from cart
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);

      if (item) {  // FIX: Ensure item exists before updating
        item.quantity = quantity;
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.name !== name); // Remove if quantity is 0
        }
      }
    },
  },
});

// Export Redux actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
