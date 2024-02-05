import { PRODUCT_URL } from '../constant.js';
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL
            }),
            keepUnusedDataFor: 5
        }),
    })
});

export const { useGetProductsQuery } = productsApiSlice;