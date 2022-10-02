import {createSlice} from "@reduxjs/toolkit"
import {IHomeState} from "./types";

const initialState: IHomeState = {
    animeList: null
}
const HomeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setAnimeList(state, action) {
            state.animeList = action.payload
        }
    }
})
export const {setAnimeList} = HomeSlice.actions
export default HomeSlice.reducer
