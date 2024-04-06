import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // Use push to add a new item immutably
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    cartItem: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem ,cartItem } = cartSlice.actions;
export default cartSlice.reducer;
