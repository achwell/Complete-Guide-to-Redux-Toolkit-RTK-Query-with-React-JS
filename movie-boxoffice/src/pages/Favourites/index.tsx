import React from 'react'
import {useNavigate} from "react-router-dom"
import {FiArrowLeft} from "react-icons/fi"
import {useAppSelector} from "../../app/hooks"
import Card from "../../components/Card"
import "./styles.css"


const Favourites = () => {

  const {movies} = useAppSelector(state => state.favourites)
  const navigate = useNavigate()

  return (
      <>
        <div className="container">
          <div className="header">
            <FiArrowLeft size={24} onClick={() => navigate("/")}/>
          </div>
          <h4 className="title">Favourites</h4>
          {!movies.length && <h3 style={{marginTop: "70px"}}>Please add your favourites</h3>}
          <div className="row">
            {movies?.map(movie => <Card key={movie.id} movieData={movie}/>)}
          </div>
        </div>
      </>
  )
}

export default Favourites
