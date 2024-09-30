import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response, User } from '../model/types'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.SERVER_URL,
    'credentials': 'include'
})

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,

    endpoints: (builder) => ({

        registration: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'registration/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.CLIENT_URL,
                },
            })
        }),

        login: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'login/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.CLIENT_URL,
                },
            })
        }),

        refresh: builder.mutation<Response, void>({
            query: () => ({
                url: 'refresh',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.CLIENT_URL,
                },
            })
        }),

        logout: builder.mutation<string, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': process.env.CLIENT_URL,
                },
            })
        })

    }),
})