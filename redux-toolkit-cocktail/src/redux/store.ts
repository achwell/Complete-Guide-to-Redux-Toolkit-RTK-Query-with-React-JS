import {configureStore} from "@reduxjs/toolkit";
import CocktailReducer from "./features/cocktailSlice";

export const store = configureStore({
    reducer: {
        app: CocktailReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
