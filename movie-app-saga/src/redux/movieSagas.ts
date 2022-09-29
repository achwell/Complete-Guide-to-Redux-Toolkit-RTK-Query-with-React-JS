import {call, fork, put, takeLatest} from "redux-saga/effects";
import {fetchMovie, fetchMovies} from "./api";
import {getMovie, getMovies, setMovie, setMovies} from "./feature/movieSlice";
import RootObject from "../types/RootObject";

interface Props {
  type: "string"
  payload: "string"
}

export interface ResponseGenerator{
  config?:any,
  data?:RootObject,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

function* onLoadMoviesAsync({payload}: Props) {

  try {
    const response:ResponseGenerator = yield call(fetchMovies, payload);
    if (response.status === 200) {
      yield put(setMovies({ ...response.data?.Search }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* onLoadMovieAsync({ payload }: Props) {
  try {
    const response:ResponseGenerator = yield call(fetchMovie, payload);

    console.log(response)

    if (response.status === 200) {
      yield put(setMovie({ ...response.data?.Search }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* onLoadMovies() {
  yield takeLatest(getMovies.type, onLoadMoviesAsync);
}

function* onLoadMovie() {
  yield takeLatest(getMovie.type, onLoadMovieAsync);
}

export const moviesSagas = [fork(onLoadMovies), fork(onLoadMovie)];
