import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "/Cart detail",
  initialState: {
    cart: null,
  },
  reducers: {
    setCartAction: (state, action) => {
      state.cart = action.payload;
    },
  },
});

const { reducer, actions } = cartSlice;

export const { setCartAction } = actions;

export default reducer;
