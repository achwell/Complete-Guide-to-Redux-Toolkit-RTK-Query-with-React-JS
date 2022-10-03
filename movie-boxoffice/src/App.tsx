import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import Favourites from "./pages/Favourites"
import "./App.css"
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
                <Route path="/favourites" element={<Favourites/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
