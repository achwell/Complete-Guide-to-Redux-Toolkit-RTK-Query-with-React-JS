import { createSlice } from "@reduxjs/toolkit";
import IMovie from "../../types/IMovie";

let initialState: {
  moviesList: IMovie[],
  movie?: IMovie
} = {
  moviesList: [],
  movie: undefined,
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    getMovies(name) {
      return name;
    },
    setMovies: (state, action) => {
      state.moviesList = action.payload;
    },
    getMovie(id) {
      return id;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { getMovies, setMovies, setMovie, getMovie } = movieSlice.actions;

export default movieSlice.reducer;
