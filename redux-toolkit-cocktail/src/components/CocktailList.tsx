import React, {useState, useEffect} from "react"
import {fetchCocktails} from "../redux/features/cocktailSlice"
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import Drink from "../types/Drink"

const CocktailList = () => {
    const {cocktails, loading} = useAppSelector((state) => ({...state.app}))
    const [modifiedCocktail, setModifiedCocktail] = useState<Drink[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCocktails())
    }, [])

    useEffect(() => {
        if (cocktails) {
            setModifiedCocktail(cocktails)
        } else {
            setModifiedCocktail([])
        }
    }, [cocktails])

    if (loading) {
        return (
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    if (!cocktails) {
        return <h2>No Cocktails matched your search criteria</h2>
    }

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {modifiedCocktail.map((item) => {
                    const {idDrink, strDrink, strDrinkThumb, strGlass, strAlcoholic} = item
                    return (
                        <div className="col" key={idDrink}>
                            <div className="card h-2">
                                <img src={strDrinkThumb} alt={strDrink} className="card-img-top"/>
                                <div className="card-body" style={{textAlign: "left"}}>
                                    <h5 className="card-title">{strDrink}</h5>
                                    <h4 className="card-title">{strGlass}</h4>
                                    <p className="card-text">{strAlcoholic}</p>
                                    <Link to={`/cocktail/${idDrink}`}>
                                        <button className="btn btn-info">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CocktailList
