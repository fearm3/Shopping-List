import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../features/product/productsApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,

    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
