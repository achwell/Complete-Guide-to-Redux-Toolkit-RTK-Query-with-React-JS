import React, {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {fetchSingleCocktail} from "../redux/features/cocktailSlice"
import {useAppDispatch, useAppSelector} from "../redux/hooks"
import Drink from "../types/Drink";

const SingleCocktail = () => {

    const {cocktail, loading} = useAppSelector((state) => ({...state.app}))
    const [modifiedCocktail, setModifiedCocktail] = useState<Drink>()
    const dispatch = useAppDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchSingleCocktail(id || ""))
    }, [id])

    useEffect(() => {
        if (cocktail.length > 0) {
            setModifiedCocktail(cocktail[0])
        } else {
            setModifiedCocktail(undefined)
        }
    }, [id, cocktail])

    if (!modifiedCocktail) {
        return <h2 className="section-title">No Cocktail to Display</h2>
    } else {
        const {
            strDrink,
            strDrinkThumb,
            strCategory,
            strAlcoholic,
            strGlass,
            strInstructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
        } = modifiedCocktail
        const ingredients = [strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5].filter(i => !!i).join(", ")
        return (
            <>
                {loading ? (
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <section className="section cocktail-section">
                        <Link to="/">
                            <button className="btn btn-danger" style={{marginTop: "2rem"}}>
                                Go Back
                            </button>
                        </Link>
                        <h2 className="section-title">{strDrink}</h2>
                        <div className="drink">
                            <img src={strDrinkThumb} alt={strDrink}/>
                            <div className="drink-strAlcoholic">
                                <p>
                                    <span className="drink-data">Name: </span> {strDrink}
                                </p>
                                <p>
                                    <span className="drink-data">Category: </span> {strCategory}
                                </p>
                                <p>
                                    <span className="drink-data">Info: </span> {strAlcoholic}
                                </p>
                                <p>
                                    <span className="drink-data">Glass: </span> {strGlass}
                                </p>
                                <p>
                                    <span className="drink-data">Instructions: </span>{" "}
                                    {strInstructions}
                                </p>
                                <p>
                                    <span className="drink-data">Ingredients: </span>
                                    {ingredients && <span>{ingredients}</span>}
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </>
        )
    }
}

export default SingleCocktail
