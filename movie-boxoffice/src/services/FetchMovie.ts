import {useQuery} from "react-query"
import api from "./api"
import {MovieType} from "../common/types"

type MovieFetch = (movieId: string) => Promise<MovieType>

const fetcMovieById: MovieFetch = async (movieId: string) => {
    const {data} = await api.get(`/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`)
    return data
}

const useFetchMovieById = (movieId: string) => useQuery(
    ["movie", movieId],
    () => fetcMovieById(movieId), {keepPreviousData: true})

export default useFetchMovieById
