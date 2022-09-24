import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import Todo from "../../types/Todo";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/todos",
            transformResponse: (rawResult: Todo[]) => rawResult.sort((a, b) => b.id - a.id),
            providesTags: ["Todos"],
        }),
        addTodo: builder.mutation<Todo, Partial<Todo>>({
            query: (todo) => ({
                url: "/todos",
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: builder.mutation<Todo, Todo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["Todos"],
        })
    })
})

export const {useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation} = apiSlice
