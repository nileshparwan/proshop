import { USERS_URL } from '../constant.js';
import { apiSlice } from './apiSlice.js';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            }),
            keepUnusedDataFor: 5
        })
    })
});

console.log(usersApiSlice);

export const {
    userLoginMutation
} = usersApiSlice;