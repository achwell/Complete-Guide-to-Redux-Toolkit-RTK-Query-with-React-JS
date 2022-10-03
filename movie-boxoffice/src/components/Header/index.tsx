import React from 'react'
import {Link} from "react-router-dom"
import "./style.css"

const Header = () => {

    return (
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/">
                    <img className="img-logo"
                         src="http://stur-exchange.co.uk/theme-content/uploads/2021/07/Box-office-logo.png" alt="logo"/>
                </Link>
                <Link to="/favourites" className="favourites text-right"
                      style={{textDecoration: "none"}}>Favourites</Link>
            </nav>
        </header>
    )
}

export default Header
