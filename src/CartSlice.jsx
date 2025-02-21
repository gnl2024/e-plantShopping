import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name); // FIX: Check by name

      if (existingItem) {
        existingItem.quantity++; // Increase quantity
      } else {
        state.items.push({ ...item, quantity: 1 }); // Add new item with quantity
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.name !== action.payload.name); // Remove item
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);

      if (item) { // FIX: Ensure item exists
        item.quantity = quantity;
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.name !== name); // Remove if quantity is 0
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
