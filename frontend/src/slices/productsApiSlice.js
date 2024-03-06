import { PRODUCT_URL, UPLOAD_URL } from '../constant.js';
import { apiSlice } from './apiSlice.js';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.productId}`,
                method: 'PUT',
                body: data
            }),
            // clear cache
            invalidatesTags: ['Product']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: 'POST',
                body: data
            })
        }),
        deleteProductImage: builder.mutation({
            query: (filename) => ({
                url: `${UPLOAD_URL}/${filename}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useUpdateProductMutation,
    useGetProductDetailsQuery,
    useUploadProductImageMutation,
    useDeleteProductImageMutation
} = productsApiSlice;