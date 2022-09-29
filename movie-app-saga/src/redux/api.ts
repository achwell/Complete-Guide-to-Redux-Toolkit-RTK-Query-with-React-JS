import axios from "axios";
import RootObject from "../types/RootObject";

const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

export const fetchMovies = async (movieName: string) =>
  axios.get<RootObject>(`${API_ENDPOINT}&s=${movieName}`);

export const fetchMovie = async (movieId: string) =>
  axios.get<RootObject>(`${API_ENDPOINT}&i=${movieId}`);
