import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Response, User } from '../model/types'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8081/',
    'credentials': 'include'
})

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    // reducerPath: 'userApi',
    baseQuery,

    endpoints: (builder) => ({

        registration: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'auth/registration/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173/',
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
                    'Access-Control-Allow-Origin': 'http://localhost:5173/',
                },
            })
        }),

        refresh: builder.mutation<Response, void>({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173/',
                },
            })
        }),

        logout: builder.mutation<string, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173/',
                },
            })
        })

    }),
})