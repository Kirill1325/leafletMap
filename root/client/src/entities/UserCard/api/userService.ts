import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response, User } from '../model/types'


// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({

        // getUserById: builder.query<User, number>({
        //     query: (id) => ({
        //         url: `user/${id}`,
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*',
        //         },
        //     })
        // }),

        registration: builder.mutation<Response, Partial<User>>({
            query: (user) => ({
                url: 'auth/registration/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
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
                    'Access-Control-Allow-Origin': '*',
                },
            })
        }),

    }),
})