import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import postReducer from "../features/postSlice"

export const store = configureStore({
  reducer: {
    app: postReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
