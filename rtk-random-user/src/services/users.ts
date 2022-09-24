import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {RootObject} from "../types/RootObject"

export const usersApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://randomuser.me",
    }),
    endpoints: (builder) => ({
        getUsers: builder.query<RootObject, void>({
            query: () => "api",
        }),
    }),
})

export const { useGetUsersQuery } = usersApi

