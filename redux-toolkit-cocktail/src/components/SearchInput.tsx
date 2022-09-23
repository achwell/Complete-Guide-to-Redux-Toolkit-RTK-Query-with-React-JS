import React, {createRef} from "react"
import { fetchSearchCocktail } from "../redux/features/cocktailSlice"
import "./SearchInput.css"
import {useAppDispatch} from "../redux/hooks";

const SearchInput = () => {
    const searchValue = createRef<HTMLInputElement>()
    const dispatch = useAppDispatch()

    const handleChange = () => {
        const searchText = searchValue.current ? searchValue.current.value : ""
        dispatch(fetchSearchCocktail(searchText))
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
    };
    return (
        <section className="section search">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Search Cocktail</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        ref={searchValue}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </section>
    );
};

export default SearchInput
