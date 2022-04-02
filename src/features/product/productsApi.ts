import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Basket } from "./productSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    products: builder.query<Basket[], void>({
      query: () => `products`,
    }),
  }),
});

export const { useProductsQuery } = productsApi;