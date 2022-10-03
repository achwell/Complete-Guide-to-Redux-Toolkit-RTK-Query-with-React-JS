import React, {FC, useState} from 'react'
import {AiOutlineStar, AiFillStar} from "react-icons/all"
import {Link} from "react-router-dom"
import {MovieType} from "../../common/types"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {addFavourite, removeFavourite} from "../../features/favMovieSlice"
import "./style.css"

type Movie = Omit<MovieType, "overview" | "vote_average" | "release_date" | "runtime" | "genres">

interface Props {
    movieData: Movie
}

const Card: FC<Props> = ({movieData}) => {

    const {movies} = useAppSelector(state => state.favourites)
    let dispatch = useAppDispatch()
    const [isFavourite, setIsFavourite] = useState<boolean>(() => {
        return !!movies.find(movie => movie.id == movieData.id)
    })

    const handleFavourite = () => {
        if (isFavourite) {
            dispatch(removeFavourite(movieData.id))
        } else {
            dispatch(addFavourite(movieData))
        }
        setIsFavourite(!isFavourite)
    }

    return (
        <div className="col-md-4 col-sm-6">
            <div className="card card-block">
                <h4 className="icon-fav">
                    <i>
                        {isFavourite ? <AiOutlineStar size={24} onClick={handleFavourite}/> :
                            <AiFillStar size={24} onClick={handleFavourite}/>}
                    </i>
                </h4>
                <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.original_title}/>
                <Link to={`/movie/${movieData.id}`} style={{textDecoration: "none"}}>
                    <h5 className="card-title mt-3 mb-3">{movieData.original_title}</h5>
                </Link>
            </div>
        </div>
    )
}

export default Card
