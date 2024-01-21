import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.pop();//refer to todo app for this code
    },
    
    clearCart: (state, action) => {
      //mutate the state Rtk allows us that
      

      return { items: [] }; 
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
