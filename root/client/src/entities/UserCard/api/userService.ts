import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response, User } from '../model/types'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://leafletmap-glmu.onrender.com/',
    // baseUrl: 'http://localhost:8080/',
    'credentials': 'include'
})

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    // reducerPath: 'userApi',
    baseQuery,

    endpoints: (builder) => ({

        registration: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'registration/',
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
                url: 'login/',
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
                url: 'refresh',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173/',
                },
            })
        }),

        logout: builder.mutation<string, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:5173/',
                },
            })
        })

    }),
})