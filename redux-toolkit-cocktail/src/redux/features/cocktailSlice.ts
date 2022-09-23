import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit"
import Drink from "../../types/Drink";
import axios from "axios";

type GetCoctailResponse = {
    drinks: Drink[]
}

export const fetchCocktails = createAsyncThunk("cocktails.fetchCocktails", async () => {
    return axios.get<GetCoctailResponse>("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=").then(res => res.data)
})

export const fetchSingleCocktail = createAsyncThunk("cocktails/fetchSingleCocktail", async (id: string) => {
    return axios.get<GetCoctailResponse>(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.data)
})

export const fetchSearchCocktail = createAsyncThunk("cocktails/fetchSearchCocktail", async (searchText: string) => {
    return axios.get<GetCoctailResponse>(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`).then((res) => res.data);
})

export interface CocktailState {
    cocktails: Drink[];
    cocktail: Drink[];
    loading: boolean,
    error?: any
}

const initialState: CocktailState = {
    cocktails: [],
    cocktail: [],
    loading: false,
    error: undefined
};

const cocktailSlice = createSlice({
    reducers: {},
    name: "cocktails",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCocktails.pending, (state: CocktailState) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchCocktails.fulfilled, (state: CocktailState, action: PayloadAction<GetCoctailResponse>) => {
                state.loading = false;
                state.cocktails = action.payload.drinks
                state.error = undefined
            })
            .addCase(fetchCocktails.rejected, (state: CocktailState, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSingleCocktail.pending, (state: CocktailState) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchSingleCocktail.fulfilled, (state: CocktailState, action: PayloadAction<GetCoctailResponse>) => {
                state.loading = false;
                state.cocktails = action.payload.drinks
                state.error = undefined
            })
            .addCase(fetchSingleCocktail.rejected, (state: CocktailState, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(fetchSearchCocktail.pending, (state: CocktailState) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchSearchCocktail.fulfilled, (state: CocktailState, action: PayloadAction<GetCoctailResponse>) => {
                state.loading = false;
                state.cocktails = action.payload.drinks
            })
            .addCase(fetchSearchCocktail.rejected, (state: CocktailState, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default cocktailSlice.reducer
