import {FetchAnimeList} from "../../services/animeService/__generated__/FetchAnimeList";

export interface IHomeState {
    animeList: FetchAnimeList["Page"]
}
