import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {MovieType} from "../common/types"

type Movie = Omit<MovieType, "overview" | "vote_average" | "release_date" | "runtime" | "genres">

interface FavouriteState {
    movies: Movie[]
}

const initialState: FavouriteState = {
    movies: []
}

const addFavouriteMovie = (state: FavouriteState, action: PayloadAction<Movie>) => {
    const existingMovie = !!state.movies.find(movie => movie.id === action.payload.id)
    if (!existingMovie) {
        state.movies.push(action.payload)
    }
}

const removeFavouriteMovie = (state: FavouriteState, action: PayloadAction<number>) => {
    state.movies = state.movies.filter(movie => movie.id !== action.payload)
}
export const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        addFavouriteMovie,
        removeFavouriteMovie
    }
})

export const {addFavouriteMovie: addFavourite, removeFavouriteMovie: removeFavourite} = favouritesSlice.actions
export default favouritesSlice.reducer
