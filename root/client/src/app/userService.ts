import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User = {
    username: string
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
    endpoints: (builder) => ({
        createUser: builder.mutation<void, User>({
            query: (body) => ({
                url: 'user',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }),
        }),
    }),
})