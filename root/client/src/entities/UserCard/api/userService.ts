import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response, User, UserDto } from '../model/types'

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    'credentials': 'include'
})

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,

    endpoints: (builder) => ({

        registration: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'auth/registration/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            })
        }),

        login: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'auth/login/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            })
        }),

        refresh: builder.mutation<Response, void>({
            query: () => ({
                url: 'auth/refresh',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            })
        }),

        logout: builder.mutation<string, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            })
        }),

        getUsers: builder.query<Omit<UserDto, 'email'>[], void>({
            query: () => ({
                url: 'user',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            }),
        }),

        getFriends: builder.query<Omit<UserDto, 'email'>[], number>({
            query: (userId) => ({
                url: `user/${userId}/friends`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            }),

        }),

        sendFriendsRequest: builder.mutation<void, { senderId: number, receiverId: number }>({
            query: ({ senderId, receiverId }) => ({
                url: `user/sendFriendsRequest`,
                method: 'POST',
                body: { senderId: senderId, receiverId: receiverId },
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': import.meta.env.VITE_CLIENT_URL,
                },
            })
        }),

    }),
})