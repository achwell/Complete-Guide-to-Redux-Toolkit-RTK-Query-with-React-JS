import React, {useState} from 'react'
import usePaginatedFetchMovies from "../../services/PaginateMovies"
import Card from "../../components/Card"


const Home = () => {
    const [page, setPage] = useState<number>(1)
    const {data: movies, isLoading} = usePaginatedFetchMovies(page)

    return (
        <>
            {isLoading ? (<h2>Loading...</h2>) : (
                <div className="container">
                    <div className="row">
                        {movies?.map(movie => <Card key={movie.id} movieData={movie}/>)}
                    </div>
                </div>
            )}
            <footer style={{margin: "10px"}}>
                <button className="btn btn-primary" type="button"
                        onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>Prev</button>
                <p style={{display: "inline", margin: "10px"}}>{page}</p>
                <button className="btn btn-primary" type="button"
                        onClick={() => setPage(prevPage => prevPage + 1)} disabled={false}>Next</button>
            </footer>
        </>
    )
}

export default Home
