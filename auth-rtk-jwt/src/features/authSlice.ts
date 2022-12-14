
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export interface AuthSate {
    name?: string
    token?: string
}

const initialState: AuthSate = {
    name: undefined,
    token: undefined,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ name: string; token: string }>
        ) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: action.payload.name,
                    token: action.payload.token,
                })
            );
            state.name = action.payload.name
            state.token = action.payload.token
        },
        logout: (state) => {
            localStorage.clear();
            state.name = undefined
            state.token = undefined
        },
    }
})

export const selectAuth = (state: RootState) => state.auth

export const { setUser, logout } = authSlice.actions

export default authSlice.reducer
