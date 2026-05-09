import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    setCart: (state, action) => {
      // Backend sometimes sends { cart: {...} } or directly the cart object
      const cartData = action.payload?.cart || action.payload || {};

      state.items = cartData.items || [];
      state.totalPrice = cartData.totalPrice || 0;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;