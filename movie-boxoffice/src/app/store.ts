import {combineReducers, configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import favReducer from "../features/favMovieSlice"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({favourites: favReducer})
export const store = configureStore({reducer: persistReducer(persistConfig, reducer)})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>
