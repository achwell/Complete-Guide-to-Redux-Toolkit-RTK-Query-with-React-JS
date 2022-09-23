import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios"
import Post from "../types/Post";

export interface PostState {
    post: Post[];
    loading: boolean
    error?: any
    body: string,
    edit: boolean
}

const initialState: PostState = {
    post: [],
    loading: false,
    error: null,
    body: "",
    edit: false,
}

export const getPost = createAsyncThunk("post/getPost", async (id: string) => {
    return axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
        res.data
    )
})

export const deletePost = createAsyncThunk("post/deletePost", async (id: number) => {
        return axios.delete<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.data)
    }
)

export const createPost = createAsyncThunk("post/createPost", async (values: Partial<Post>) => {
        const payload = JSON.stringify({
            title: values.title,
            body: values.body,
        })
        return axios.post<Post>(`https://jsonplaceholder.typicode.com/posts/`, payload, {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        }).then((res) => res.data)
    }
)
export const updatePost = createAsyncThunk("post/updatePost", async ({ id, body, title }:Post) => {
    const payload = JSON.stringify({
        title,
        body,
    });
        return axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, payload,{
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            }
        }).then((res) => res.data)
    }
);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {setEdit: (state, action) => {
            state.edit = action.payload.edit;
            state.body = action.payload.body;
        }},
    extraReducers: (builder) => {
        builder.addCase(getPost.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getPost.fulfilled, (state, action) => {
            state.loading = false
            state.post = [action.payload]
        })
        builder.addCase(getPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(deletePost.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false
            state.post = [action.payload]
        })
        builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(createPost.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.loading = false
            state.post = [action.payload]
        })
        builder.addCase(createPost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updatePost.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.loading = false
            state.post = [action.payload]
        })
        builder.addCase(updatePost.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})
export const { setEdit } = postSlice.actions
export default postSlice.reducer
