import {FetchAnimeList} from "./__generated__/FetchAnimeList"
import {apolloClient} from "../../graphql"
import {FETCH_ANIME_LIST} from "./queries";

class AnimeService {
    async fetchAnimeList(page: number, perPage = 12): Promise<FetchAnimeList["Page"]> {
        try {
            const response = await apolloClient.query({
                query: FETCH_ANIME_LIST,
                variables: {page, perPage}
            })

            if (!response || !response.data) {
                throw new Error("Something went wrong")
            }
            return response.data.Page
        } catch (e) {

            console.log({e})

            throw e
        }
    }
}

export default new AnimeService()
