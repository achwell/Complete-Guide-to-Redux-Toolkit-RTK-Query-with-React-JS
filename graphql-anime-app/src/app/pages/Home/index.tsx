import React, {useEffect} from 'react'
import {Dispatch} from "redux"
import animeService from "../../services/animeService"
import {FetchAnimeList} from "../../services/animeService/__generated__/FetchAnimeList"
import {setAnimeList} from "./homeSlice"
import {useAppDispatch} from "../../hooks"
import Card from "../../components/Card"

const actionDispatch = (dispatch: Dispatch) => ({
    setAnimeList: (page: FetchAnimeList["Page"]) => dispatch(setAnimeList(page))
})

const Home = () => {

    const {setAnimeList} = actionDispatch(useAppDispatch())

    useEffect(() => {
        fetchAnime()
    }, [])

    const fetchAnime = async () => {
        const animeList = await animeService.fetchAnimeList(0).catch(err => console.error(err))
        if (animeList) {
            setAnimeList(animeList)
        }
    }

    return (
        <>
            <h3>Anime App</h3>
            <Card/>
        </>
    )
}

export default Home
