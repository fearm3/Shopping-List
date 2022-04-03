import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export interface Basket {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}


export interface Rating {
  rate: number;
  count: number;
}

export const productSlice: any = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart(state: any, action: any) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state: any, action: any) {
      const nextCartItems = state.cartItems.filter(
        (item: any) => item.id !== action.payload.id
      );

      state.cartItems = nextCartItems;
    },
  },
});

export const { addToCart, removeFromCart } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

export default productSlice.reducer;
