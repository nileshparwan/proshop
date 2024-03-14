import { USERS_URL } from '../constant.js';
import { apiSlice } from './apiSlice.js';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST"
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        profile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            // to prevent reloading because of cache
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (userData) => ({
                url: `${USERS_URL}/${userData.userId}`,
                method: 'PUT',
                body: userData
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useLoginMutation,
    useLogoutMutation,
    useProfileMutation,
    useRegisterMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserDetailsQuery,
} = usersApiSlice;